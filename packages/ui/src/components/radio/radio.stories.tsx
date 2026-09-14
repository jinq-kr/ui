import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio } from "./radio";

const meta = {
  title: "Primitives/Radio",
  component: Radio,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: {
    name: "plan",
    label: "기본 플랜",
    size: "md",
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };

export const Group: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Radio name="plan-group" label="기본 플랜" defaultChecked />
      <Radio name="plan-group" label="프로 플랜" />
      <Radio name="plan-group" label="엔터프라이즈" disabled />
    </div>
  ),
};
