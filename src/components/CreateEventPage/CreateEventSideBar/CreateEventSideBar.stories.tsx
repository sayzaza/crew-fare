import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import CreateEventSideBar from "./CreateEventSideBar";
import {
  CREATE_EVENT_TABS_ARRAY,
  ECreateEventTabKeys,
} from "../../../constants/createEventTabs";

const mockTabs = CREATE_EVENT_TABS_ARRAY.map((tab) => tab.key);

export default {
  title: "Components/CreateEventSideBar",
  component: CreateEventSideBar,
  argTypes: {
    activeTab: {
      control: {
        type: "inline-radio",
      },
      options: mockTabs,
      defaultValue: ECreateEventTabKeys.BASIC,
    },
    errors: {
      control: {
        type: "multi-select",
      },
      options: mockTabs,
    },
    changeActiveTab: { action: "changeActiveTab" },
  },
};

type Story = StoryObj<typeof CreateEventSideBar>;

export const Default: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState(args.activeTab || 0);

    const handleChangeActiveTab = (newTab: ECreateEventTabKeys) => {
      setActiveTab(newTab);
      args.activeTab = newTab;
    };

    return (
      <CreateEventSideBar
        {...args}
        activeTab={args.activeTab}
        errors={args.errors || []}
        changeActiveTab={handleChangeActiveTab}
      />
    );
  },
};
