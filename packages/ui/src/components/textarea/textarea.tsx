import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { textareaVariants, type TextareaVariants } from "./textarea.variants";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>, TextareaVariants {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(textareaVariants({ size }), className)}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
