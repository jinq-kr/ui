import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./select";

const meta = {
  title: "Primitives/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: {
    size: "md",
  },
  render: (args) => (
    <Select {...args}>
      <option value="">선택하세요</option>
      <option value="ko">한국어</option>
      <option value="en">English</option>
      <option value="ja">日本語</option>
    </Select>
  ),
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const Invalid: Story = { args: { "aria-invalid": true } };

export const AllSizes: Story = {
  render: (args) => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 8, width: 240 }}
    >
      {(["sm", "md", "lg"] as const).map((size) => (
        <Select key={size} {...args} size={size}>
          <option>{size}</option>
        </Select>
      ))}
    </div>
  ),
};
