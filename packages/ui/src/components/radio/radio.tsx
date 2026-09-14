import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import { radioVariants, type RadioVariants } from "./radio.variants";

export interface RadioProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    RadioVariants {
  label?: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, size, label, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const input = (
      <input
        ref={ref}
        id={inputId}
        type="radio"
        className={cn(radioVariants({ size }), className)}
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
Radio.displayName = "Radio";
