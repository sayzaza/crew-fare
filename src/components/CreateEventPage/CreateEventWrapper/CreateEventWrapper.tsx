import React, { useState } from "react";

import CreateEventSideBar from "../CreateEventSideBar/CreateEventSideBar";
import CreateEventMain from "../CreateEventMain/CreateEventMain";

import {
  CREATE_EVENT_TABS_ARRAY,
  ECreateEventTabKeys,
} from "../../../constants/createEventTabs";
import styles from "./CreateEventWrapper.module.scss";

const CreateEventWrapper = () => {
  const [activeTab, setActiveTab] = useState(ECreateEventTabKeys.BASIC);
  const [errors, setErrors] = useState<ECreateEventTabKeys[]>([]);

  const activeTabIndex = CREATE_EVENT_TABS_ARRAY.findIndex(
    (tab) => tab.key === activeTab
  );

  const onChangeTabByArrows = (changeToPrev?: boolean) => {
    const changeToIndex = changeToPrev ? -1 : 1;

    if (!CREATE_EVENT_TABS_ARRAY[activeTabIndex + changeToIndex]) return;
    setActiveTab(CREATE_EVENT_TABS_ARRAY[activeTabIndex + changeToIndex].key);
  };

  return (
    <section className={styles.createEventWrapper}>
      <CreateEventSideBar
        activeTab={activeTab}
        errors={errors}
        changeActiveTab={setActiveTab}
      />
      <CreateEventMain
        erroredTabs={errors}
        setErrors={setErrors}
        changeActiveTab={onChangeTabByArrows}
        activeTab={activeTab}
      />
    </section>
  );
};

export default CreateEventWrapper;
