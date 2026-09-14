import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../../lib/cn";
import { textVariants, type TextVariants } from "./text.variants";

const DEFAULT_ELEMENT = "p";

type TextOwnProps<E extends ElementType> = TextVariants & {
  as?: E;
  className?: string;
};

export type TextProps<E extends ElementType> = TextOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof TextOwnProps<E>>;

/**
 * 시각적 크기(size)와 문서 구조(as)를 분리한다.
 * 예: <Text as="h2" size="sm">는 접근성 트리에는 heading으로,
 * 화면에는 작은 글씨로 나타난다.
 */
export function Text<E extends ElementType = typeof DEFAULT_ELEMENT>({
  as,
  size,
  weight,
  color,
  className,
  ...props
}: TextProps<E>) {
  const Component = as ?? DEFAULT_ELEMENT;
  return (
    <Component
      className={cn(textVariants({ size, weight, color }), className)}
      {...props}
    />
  );
}
