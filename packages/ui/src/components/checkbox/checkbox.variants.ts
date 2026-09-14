import { cva, type VariantProps } from "class-variance-authority";

export const checkboxVariants = cva(
  "accent-accent cursor-pointer rounded-md border-border-strong transition duration-150 ease-out active:scale-90 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  {
    variants: {
      size: {
        sm: "h-3.5 w-3.5",
        md: "h-4 w-4",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
