import { useState } from "react";
import { Button } from "@jinq-kr/ui/button";
import { Input } from "@jinq-kr/ui/input";
import { Stack } from "@jinq-kr/ui/stack";
import { Text } from "@jinq-kr/ui/text";
import { Checkbox } from "@jinq-kr/ui/checkbox";
import { Radio } from "@jinq-kr/ui/radio";
import { Textarea } from "@jinq-kr/ui/textarea";
import { Select } from "@jinq-kr/ui/select";
import { Badge } from "@jinq-kr/ui/badge";
import { Spinner } from "@jinq-kr/ui/spinner";

/**
 * 토큰 검증 페이지 — 컴포넌트를 만들기 전에 여기서 토큰이 충분한지 먼저 확인한다.
 * 색상 값은 인라인 style로 var(--token)을 직접 참조한다 (Tailwind는 동적 클래스명을
 * 정적 분석하지 못하므로 `text-${size}` 같은 템플릿 리터럴 클래스는 쓰지 않는다).
 */

const COLORS = [
  "canvas",
  "surface",
  "surface-sunken",
  "text",
  "text-muted",
  "border",
  "border-strong",
  "accent",
  "accent-hover",
  "accent-subtle",
  "success",
  "warning",
  "danger",
] as const;

const SIZES = [
  { name: "xs", className: "text-xs" },
  { name: "sm", className: "text-sm" },
  { name: "base", className: "text-base" },
  { name: "lg", className: "text-lg" },
  { name: "xl", className: "text-xl" },
  { name: "2xl", className: "text-2xl" },
  { name: "3xl", className: "text-3xl" },
] as const;

const SPACING_STEPS = [1, 2, 3, 4, 6, 8, 12, 16] as const;

type ThemeMode = "system" | "light" | "dark";

function applyTheme(mode: ThemeMode) {
  if (mode === "system") {
    delete document.documentElement.dataset.theme;
  } else {
    document.documentElement.dataset.theme = mode;
  }
}

export default function App() {
  const [mode, setMode] = useState<ThemeMode>("system");

  const handleModeChange = (next: ThemeMode) => {
    setMode(next);
    applyTheme(next);
  };

  return (
    <main
      className="min-h-screen p-8 md:p-12"
      style={{ background: "var(--canvas)", color: "var(--text)" }}
    >
      <div className="mx-auto max-w-3xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">토큰 검증</h1>
            <p className="mt-2" style={{ color: "var(--text-muted)" }}>
              컴포넌트를 만들기 전에 여기서 토큰이 충분한지 먼저 확인한다.
            </p>
          </div>
          <div
            className="flex shrink-0 rounded-md border text-sm"
            style={{ borderColor: "var(--border-strong)" }}
          >
            {(["system", "light", "dark"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => handleModeChange(m)}
                className="px-3 py-1.5 font-medium first:rounded-l-md last:rounded-r-md"
                style={{
                  background: mode === m ? "var(--accent)" : "transparent",
                  color: mode === m ? "var(--on-accent)" : "var(--text)",
                }}
              >
                {m === "system" ? "시스템" : m === "light" ? "라이트" : "다크"}
              </button>
            ))}
          </div>
        </div>

        <h2 className="mt-12 text-xl font-semibold">색</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {COLORS.map((name) => (
            <li
              key={name}
              className="rounded-md border p-3"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="h-10 w-full rounded-sm border"
                style={{
                  background: `var(--${name})`,
                  borderColor: "var(--border)",
                }}
              />
              <p className="mt-2 text-sm">{name}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-xl font-semibold">타이포</h2>
        <ul
          className="mt-4 space-y-2"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {SIZES.map(({ name, className }) => (
            <li key={name} className={className}>
              <span
                className="mr-3 inline-block w-10 text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                {name}
              </span>
              다람쥐 헌 쳇바퀴에 타고파
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-xl font-semibold">간격 (4px 배수)</h2>
        <ul className="mt-4 space-y-2">
          {SPACING_STEPS.map((step) => (
            <li key={step} className="flex items-center gap-3">
              <span
                className="w-10 text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                {step * 4}px
              </span>
              <div
                className="h-4"
                style={{
                  width: `calc(var(--spacing) * ${step})`,
                  background: "var(--accent)",
                }}
              />
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-xl font-semibold">상태 (contrast 확인)</h2>
        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {(["success", "warning", "danger"] as const).map((name) => (
            <li
              key={name}
              className="rounded-md p-3 text-sm font-medium"
              style={{
                background: `var(--${name})`,
                color: `var(--on-${name})`,
              }}
            >
              {name}
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-xl font-semibold">컴포넌트</h2>

        <Text
          as="h3"
          size="sm"
          weight="semibold"
          color="muted"
          className="mt-6 uppercase tracking-wide"
        >
          Button — variant
        </Text>
        <Stack direction="row" gap="sm" wrap className="mt-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </Stack>

        <Text
          as="h3"
          size="sm"
          weight="semibold"
          color="muted"
          className="mt-6 uppercase tracking-wide"
        >
          Button — size
        </Text>
        <Stack direction="row" gap="sm" align="center" className="mt-3">
          <Button size="sm">sm</Button>
          <Button size="md">md</Button>
          <Button size="lg">lg</Button>
        </Stack>

        <Text
          as="h3"
          size="sm"
          weight="semibold"
          color="muted"
          className="mt-6 uppercase tracking-wide"
        >
          Input
        </Text>
        <Stack gap="sm" className="mt-3 max-w-xs">
          <Input placeholder="기본" />
          <Input placeholder="비활성" disabled />
          <Input aria-invalid defaultValue="잘못된 값" />
        </Stack>

        <Text
          as="h3"
          size="sm"
          weight="semibold"
          color="muted"
          className="mt-6 uppercase tracking-wide"
        >
          Stack — direction / gap
        </Text>
        <Stack direction="row" gap="lg" className="mt-3">
          <Stack gap="xs">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-8 w-16 rounded-sm"
                style={{ background: "var(--accent-subtle)" }}
              />
            ))}
          </Stack>
          <Stack direction="row" gap="xs">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-8 w-16 rounded-sm"
                style={{ background: "var(--accent-subtle)" }}
              />
            ))}
          </Stack>
        </Stack>

        <Text
          as="h3"
          size="sm"
          weight="semibold"
          color="muted"
          className="mt-6 uppercase tracking-wide"
        >
          Text — color
        </Text>
        <Stack gap="xs" className="mt-3">
          <Text color="default">default</Text>
          <Text color="muted">muted</Text>
          <Text color="accent">accent</Text>
          <Text color="success">success</Text>
          <Text color="warning">warning</Text>
          <Text color="danger">danger</Text>
        </Stack>

        <Text
          as="h3"
          size="sm"
          weight="semibold"
          color="muted"
          className="mt-6 uppercase tracking-wide"
        >
          Checkbox / Radio
        </Text>
        <Stack gap="sm" className="mt-3">
          <Checkbox label="약관에 동의합니다" defaultChecked />
          <Checkbox label="비활성" disabled />
          <Radio name="plan" label="기본 플랜" defaultChecked />
          <Radio name="plan" label="프로 플랜" />
        </Stack>

        <Text
          as="h3"
          size="sm"
          weight="semibold"
          color="muted"
          className="mt-6 uppercase tracking-wide"
        >
          Textarea / Select
        </Text>
        <Stack gap="sm" className="mt-3 max-w-xs">
          <Textarea placeholder="내용을 입력하세요" />
          <Select defaultValue="ko">
            <option value="ko">한국어</option>
            <option value="en">English</option>
          </Select>
        </Stack>

        <Text
          as="h3"
          size="sm"
          weight="semibold"
          color="muted"
          className="mt-6 uppercase tracking-wide"
        >
          Badge / Spinner
        </Text>
        <Stack direction="row" gap="sm" align="center" className="mt-3">
          <Badge>default</Badge>
          <Badge variant="accent">accent</Badge>
          <Badge variant="success">success</Badge>
          <Badge variant="warning">warning</Badge>
          <Badge variant="danger">danger</Badge>
          <Spinner tone="accent" />
        </Stack>
      </div>
    </main>
  );
}
