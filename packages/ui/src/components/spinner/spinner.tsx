import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { spinnerVariants, type SpinnerVariants } from "./spinner.variants";

export interface SpinnerProps
  extends HTMLAttributes<HTMLSpanElement>, SpinnerVariants {
  label?: string;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size, tone, label = "로딩 중", ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      className={cn("inline-flex items-center", className)}
      {...props}
    >
      <span className={spinnerVariants({ size, tone })} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  ),
);
Spinner.displayName = "Spinner";
