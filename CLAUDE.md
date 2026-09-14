# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install                          # 워크스페이스 전체 설치 (루트에서)
pnpm build                            # turbo run build — 전체 워크스페이스 빌드
pnpm dev                              # turbo run dev — apps/docs Vite dev 서버
pnpm --filter docs dev                # apps/docs만 개발 서버로 실행 (base path: /ui/)
pnpm storybook                        # turbo run storybook — packages/ui Storybook 실행 (:6006)
pnpm --filter @jinq-kr/ui storybook   # 동일 (직접 지정)
pnpm --filter @jinq-kr/ui build-storybook   # 정적 Storybook 빌드 (storybook-static/)
pnpm --filter <package> <script>      # 특정 패키지만 대상으로 실행
```

테스트 러너는 아직 없음. `apps/docs`에 `lint`(`oxlint`) 스크립트가 있지만 루트 turbo 파이프라인에는 아직 연결되어 있지 않음.

`pnpm dlx`로 `storybook`/`storybook@latest`를 실행하면 이 환경(pnpm 10.6.1 + Windows)에서 `ERR_INVALID_ARG_TYPE` 로 깨짐 (다른 dlx 패키지는 정상 동작 — storybook 특정 이슈로 추정). Storybook 관련 작업은 항상 `pnpm add -D`로 로컬 설치 후 `pnpm exec`/package.json script로 실행할 것, `storybook init` 계열 명령도 마찬가지로 피할 것.

## Architecture

pnpm workspace + Turborepo 모노레포. 패키지는 계층 단위로 딱 2개만 존재하며, 컴포넌트별로 별도 npm 패키지를 만들지 않는다(버전 스큐·릴리스 오케스트레이션 비용이 이득보다 크다는 판단 — Radix/shadcn이 개별 패키지를 단일 패키지로 통합한 선례를 따름).

- **`packages/tokens`** (`@jinq-kr/tokens`) — CSS만 있는 프레임워크 무관 패키지. `src/theme.css`가 유일한 산출물이며 `exports["./theme.css"]`로만 노출된다. 구조는 3단:
  1. 바깥 `:root` — 라이트(기본값)
  2. `@media (prefers-color-scheme: dark)` 안에 `:root:not([data-theme="light"])` — OS가 다크면 따라가되 명시적 라이트 선택은 이김
  3. `:root[data-theme="dark"]` — 명시적 다크 선택, OS 설정보다 우선

  마지막에 Tailwind v4 `@theme inline { ... }` 블록으로 `--color-*`, `--text-*`, `--spacing` 등을 실제 유틸리티에 매핑한다. **새 토큰을 추가할 때 이 3단 구조를 반드시 지킬 것** — 색을 media/data-theme 블록 안에만 정의하면 시스템 설정 없이는 그 색이 아예 적용되지 않는 버그가 된다.

- **`packages/ui`** (`@jinq-kr/ui`) — 컴포넌트 전체가 들어가는 단일 패키지. 배포는 하나지만 `@jinq-kr/ui/button`, `@jinq-kr/ui/input` 같은 subpath export만 지원한다 (루트 배럴 export 없음, `package.json`의 `exports` 맵 참고). 컴포넌트마다 3파일 구조를 지킨다:
  - `component.tsx` — 컴포넌트 본체
  - `component.variants.ts` — CVA(`class-variance-authority`) 정의만 분리
  - `index.ts` — 재수출

  스타일 클래스 병합은 `src/lib/cn.ts`(`clsx` + `tailwind-merge`)를 통해서만 한다.

- **`apps/docs`** — Vite + React, 토큰/컴포넌트 검증 데모 사이트. GitHub Pages 배포 워크플로우(`.github/workflows/pages.yml`)가 있고 `vite.config.ts`의 `base: '/ui/'`는 이 저장소가 `<owner>.github.io/ui/` 형태의 프로젝트 페이지로 배포된다는 가정에 맞춰져 있다 — 실제 배포 경로가 다르면 이 값을 바꿔야 한다.

- **Storybook** — 별도 앱이 아니라 `packages/ui/.storybook/`에 위치. 스토리 파일(`*.stories.tsx`)은 각 컴포넌트 디렉터리에 콜로케이트되어 있다 (`packages/ui/src/components/*/*.stories.tsx`). `.storybook/preview.ts`에 라이트/시스템/다크 툴바 토글이 커스텀 `globalTypes`로 구현되어 있어 `[data-theme]` 전환을 스토리에서 바로 확인할 수 있다.

### Tailwind v4 관련 핵심 주의사항

Tailwind v4의 자동 소스 감지는 **패키지 경계를 넘지 않는다.** `apps/docs`처럼 다른 패키지(`packages/ui`)의 컴포넌트를 렌더링만 하고 자기 소스 트리 안에는 그 컴포넌트 코드가 없는 앱은, CSS 진입점에 `@source "<상대경로>";`를 명시하지 않으면 그 컴포넌트가 쓰는 유틸리티 클래스(`bg-accent` 등)가 에러 없이 조용히 컴파일 결과에서 빠진다. `apps/docs/src/index.css`에 이미 `@source "../../../packages/ui/src";`가 있는 이유가 이것이다. 반대로 Storybook은 스토리와 컴포넌트가 같은 패키지(`packages/ui`) 안에 있으므로 `@source` 없이도 정상 동작한다 — 새로운 앱/도구를 추가해 `packages/ui`를 소비할 때마다 이 문제를 다시 만난다는 점을 기억할 것.

### CSS 배포 방식

`packages/ui`는 아직 컴파일된 CSS를 자체적으로 산출하지 않는다. 현재는 모노레포 안의 모든 소비처(`apps/docs`, Storybook)가 각자 Tailwind를 빌드하면서 위의 `@source`로 `packages/ui`의 소스를 직접 스캔하는 방식이다. 모노레포 밖으로 배포할 때는 `packages/ui`가 `styles.css`를 컴파일해서 동봉하는 방식(옵션 A, 소스 배포는 기각됨)으로 전환하기로 되어 있으나 아직 구현되지 않았다.

### 디자인 토큰

색은 숫자 스케일(`blue-500` 등)이 아니라 전부 의미 이름(`--surface`, `--accent`, `--text-muted` 등)이다. 단일 OKLCH 시드 컬러(현재 `#2A6F97`)에서 색상(H)은 고정한 채 명도/채도만 역할별로 바꿔 중립·브랜드 팔레트를 파생한다. `success`/`warning`/`danger`는 색상은 고정된 값(초록/호박/빨강)을 쓰되 채도만 시드의 채도에 맞춰 스케일한다. 파생 로직(및 대비 계산)은 대화 중 만든 "시드 팔레트" 아티팩트 도구와 동일한 공식이며, 새 시드로 바꿀 때는 그 도구로 값을 다시 뽑아 `packages/tokens/src/theme.css`에 반영하면 된다.

## 작업 방식 (대화 중 명시적으로 정한 것들 — 어길 때는 먼저 확인)

- **커밋은 명시적으로 요청받았을 때만.** 작업이 끝났다고 자동으로 커밋하지 않는다.
- **컴포넌트/추상화는 실사용이 두 번째로 필요해진 시점에 승격한다.** "언젠가 쓰겠지"로 미리 만들지 않는다 (`packages/ui`에 아직 없는 컴포넌트는 `apps/docs`나 다른 곳에서 실제로 두 번째로 필요해지기 전까지 만들지 않는 것이 원칙).
- **Storybook은 원래 계획엔 "컴포넌트 10개 넘을 때"로 되어 있었으나, 사용자가 4개 시점에 명시적으로 요청해서 먼저 구현함.** 이 예외는 명시적 지시에 의한 것이고, 원칙 자체가 폐기된 것은 아니다.
- **접근성은 처음부터**: 포커스 표시, 키보드 조작, 색 대비(WCAG AA)를 나중에 붙이는 게 아니라 토큰/컴포넌트 설계 단계에서 고려한다. Storybook에 `@storybook/addon-a11y`가 이미 붙어 있는 이유.
- **사용처 → 시스템 순서.** 새 토큰이나 컴포넌트는 실제 화면(`apps/docs`가 첫 사용처)에서 필요를 확인한 뒤에 시스템에 반영한다. 역순으로 진행하지 않는다.
- **Checkbox/Radio/Textarea/Select/Badge/Spinner도 실사용 없이 먼저 추가됨** — "완전 기본적으로 쓰는 것"이라는 명시적 요청에 따른 예외. 반대로 Card, Modal, Tooltip은 구현 복잡도(포털·포커스 트랩·포지셔닝) 때문에 이번엔 의도적으로 제외했고, 여전히 실사용 2회 원칙을 적용한다. Box처럼 열린 스타일-prop 컴포넌트(MUI/Chakra 식)는 "색은 의미 이름만" 원칙을 비껴가는 구멍이 된다는 이유로 채택하지 않기로 함 — 필요하면 Tailwind 유틸리티를 직접 쓰거나, 반복되면 좁은 목적의 컴포넌트(예: `Surface`)로 승격.
