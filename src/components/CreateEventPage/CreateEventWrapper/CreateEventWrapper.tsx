import React from "react";

import styles from "./CreateEventWrapper.module.scss";
import CreateEventSideBar from "../CreateEventSideBar/CreateEventSideBar";
import CreateEventMain from "../CreateEventMain/CreateEventMain";


const CreateEventWrapper = () => {
  return (
    <section className={styles.createEventWrapper}>
      <CreateEventSideBar />
      <CreateEventMain />
    </section>
  );
};

export default CreateEventWrapper;
