import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import { checkboxVariants, type CheckboxVariants } from "./checkbox.variants";

export interface CheckboxProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    CheckboxVariants {
  label?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, size, label, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const input = (
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        className={cn(checkboxVariants({ size }), className)}
        {...props}
      />
    );

    if (!label) return input;

    return (
      <label
        htmlFor={inputId}
        className="inline-flex cursor-pointer items-center gap-2 text-sm text-text"
      >
        {input}
        {label}
      </label>
    );
  },
);
Checkbox.displayName = "Checkbox";
