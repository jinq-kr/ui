import { cva, type VariantProps } from "class-variance-authority";

export const spinnerVariants = cva(
  "inline-block animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-6 w-6",
        lg: "h-8 w-8",
      },
      tone: {
        current: "text-current",
        accent: "text-accent",
        muted: "text-text-muted",
      },
    },
    defaultVariants: {
      size: "md",
      tone: "current",
    },
  },
);

export type SpinnerVariants = VariantProps<typeof spinnerVariants>;
