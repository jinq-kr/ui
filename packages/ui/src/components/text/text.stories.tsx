import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./text";

const meta = {
  title: "Primitives/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl"],
    },
    weight: {
      control: "select",
      options: ["regular", "medium", "semibold", "bold"],
    },
    color: {
      control: "select",
      options: ["default", "muted", "accent", "success", "warning", "danger"],
    },
  },
  args: {
    children: "다람쥐 헌 쳇바퀴에 타고파",
    size: "base",
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Scale: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {(["xs", "sm", "base", "lg", "xl", "2xl", "3xl"] as const).map((size) => (
        <Text key={size} size={size}>
          {size} — 다람쥐 헌 쳇바퀴에 타고파
        </Text>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {(
        ["default", "muted", "accent", "success", "warning", "danger"] as const
      ).map((color) => (
        <Text key={color} color={color}>
          {color}
        </Text>
      ))}
    </div>
  ),
};

export const Heading: Story = {
  args: { as: "h2", size: "xl", weight: "semibold" },
};
