import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { Stack } from "./stack";

function Box({ children }: { children?: ReactNode }) {
  return (
    <div
      style={{
        background: "var(--accent-subtle)",
        color: "var(--text)",
        padding: 8,
        borderRadius: 4,
        minWidth: 32,
        textAlign: "center",
      }}
    >
      {children ?? "Box"}
    </div>
  );
}

const meta = {
  title: "Primitives/Stack",
  component: Stack,
  tags: ["autodocs"],
  argTypes: {
    direction: { control: "radio", options: ["row", "column"] },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch"],
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between"],
    },
    gap: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
  },
  args: {
    direction: "row",
    gap: "md",
  },
  render: (args) => (
    <Stack {...args}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </Stack>
  ),
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = { args: { direction: "row" } };
export const Column: Story = { args: { direction: "column" } };
export const Centered: Story = {
  args: { direction: "row", justify: "center", align: "center" },
};
