import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { stackVariants, type StackVariants } from "./stack.variants";

export interface StackProps
  extends HTMLAttributes<HTMLDivElement>, StackVariants {}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, align, justify, gap, wrap, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        stackVariants({ direction, align, justify, gap, wrap }),
        className,
      )}
      {...props}
    />
  ),
);
Stack.displayName = "Stack";
