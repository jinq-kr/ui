import { cva, type VariantProps } from "class-variance-authority";

export const selectVariants = cva(
  "w-full rounded-xl border border-border-strong bg-surface text-text shadow-sm transition duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-danger aria-invalid:focus-visible:outline-danger",
  {
    variants: {
      size: {
        sm: "h-8 px-2.5 text-sm",
        md: "h-10 px-3 text-base",
        lg: "h-12 px-4 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type SelectVariants = VariantProps<typeof selectVariants>;
