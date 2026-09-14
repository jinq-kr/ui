import { cva, type VariantProps } from "class-variance-authority";

export const textareaVariants = cva(
  "w-full rounded-xl border border-border-strong bg-surface text-text placeholder:text-text-muted shadow-sm transition duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-danger aria-invalid:focus-visible:outline-danger",
  {
    variants: {
      size: {
        sm: "min-h-16 px-2.5 py-1.5 text-sm",
        md: "min-h-24 px-3 py-2 text-base",
        lg: "min-h-32 px-4 py-2.5 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type TextareaVariants = VariantProps<typeof textareaVariants>;
