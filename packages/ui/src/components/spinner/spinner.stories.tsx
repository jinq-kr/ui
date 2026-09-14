import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./spinner";

const meta = {
  title: "Primitives/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    tone: { control: "select", options: ["current", "accent", "muted"] },
  },
  args: {
    size: "md",
    tone: "accent",
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "lg",
    tone: "muted",
    label: "ㅇㅇㅇㅇㅇ\n"
  }
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Spinner key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const InButton: Story = {
  render: (args) => (
    <button
      type="button"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "var(--accent)",
        color: "var(--on-accent)",
        border: "none",
        borderRadius: 6,
        padding: "8px 16px",
        fontWeight: 500,
      }}
    >
      <Spinner {...args} size="sm" tone="current" />
      처리 중
    </button>
  ),
};
