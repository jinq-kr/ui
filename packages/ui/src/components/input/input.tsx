import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { inputVariants, type InputVariants } from "./input.variants";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">, InputVariants {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(inputVariants({ size }), className)}
      {...props}
    />
  ),
);
Input.displayName = "Input";
