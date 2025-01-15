import React, { useState } from "react";

import styles from "./CreateEventWrapper.module.scss";
import CreateEventSideBar from "../CreateEventSideBar/CreateEventSideBar";
import CreateEventMain from "../CreateEventMain/CreateEventMain";
import { ECreateEventTabKeys } from "../../../constants/createEventTabs";

const CreateEventWrapper = () => {
  const [activeTab, setActiveTab] = useState(ECreateEventTabKeys.BASIC);
  const [errors, setErrors] = useState<ECreateEventTabKeys[]>([
    ECreateEventTabKeys.DATES,
  ]);
  return (
    <section className={styles.createEventWrapper}>
      <CreateEventSideBar
        activeTab={activeTab}
        errors={errors}
        changeActiveTab={setActiveTab}
      />
      <CreateEventMain />
    </section>
  );
};

export default CreateEventWrapper;
