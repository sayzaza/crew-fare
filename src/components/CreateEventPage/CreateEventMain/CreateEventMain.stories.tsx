import { Meta, StoryFn } from "@storybook/react";

import CreateEventMain from "./CreateEventMain";
import { ECreateEventTabKeys } from "../../../constants/createEventTabs";

const mockChangeActiveTab = (changeToPrev?: boolean) => {
  console.log(`Active tab changed: ${changeToPrev ? "Previous" : "Next"}`);
};

export default {
  title: "Components/CreateEventMain",
  component: CreateEventMain,
  args: {
    activeTab: ECreateEventTabKeys.DETAILS, 
  },
  argTypes: {
    activeTab: {
      control: {
        type: "select",
    },
    options: Object.values(ECreateEventTabKeys),
    },
  },
} as Meta<typeof CreateEventMain>;

const Template: StoryFn<typeof CreateEventMain> = (args) => (
  <CreateEventMain {...args} changeActiveTab={mockChangeActiveTab} />
);

export const Default = Template.bind({});
Default.args = {
  activeTab: ECreateEventTabKeys.DETAILS, 
};
