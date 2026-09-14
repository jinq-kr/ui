import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition duration-150 ease-out active:scale-95 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-on-accent shadow-sm hover:bg-accent-hover hover:shadow-md",
        secondary:
          "bg-surface text-text border border-border-strong hover:bg-surface-sunken",
        outline:
          "bg-transparent text-accent border border-accent hover:bg-accent-subtle",
        ghost: "bg-transparent text-text hover:bg-surface-sunken",
        danger:
          "bg-danger text-on-danger shadow-sm hover:brightness-90 hover:shadow-md",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
