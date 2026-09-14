import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { selectVariants, type SelectVariants } from "./select.variants";

export interface SelectProps
  extends
    Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">,
    SelectVariants {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, size, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(selectVariants({ size }), className)}
      {...props}
    >
      {children}
    </select>
  ),
);
Select.displayName = "Select";
