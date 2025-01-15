import React from "react";

import styles from "./CreateEventMain.module.scss";
import Svg from "../../layout/Svg/Svg";
import { alertIcon, arrowLeftIcon, arrowRightIcon } from "../../../assets/svg";
import MainBtn from "../../layout/MainBtn/MainBtn";
import {
  CREATE_EVENT_TABS,
  CREATE_EVENT_TABS_ARRAY,
  ECreateEventTabKeys,
} from "../../../constants/createEventTabs";

interface Props {
  activeTab: ECreateEventTabKeys;
  changeActiveTab: (changeToPrev?: boolean) => void;
}

const CreateEventMain: React.FC<Props> = ({ activeTab, changeActiveTab }) => {
  const activeTabContent = CREATE_EVENT_TABS[activeTab];
  const activeTabIndex = CREATE_EVENT_TABS_ARRAY.findIndex(
    (tab) => tab.key === activeTab
  );
  return (
    <article className={styles.createEventMain}>
      <div className={styles.createEventMain__titleBlock}>
        <h3 className={styles.createEventMain__title}>
          {activeTabContent.title}
        </h3>
        <div className={styles.createEventMain__alert}>
          <Svg id={alertIcon} className={styles.createEventMain__alertIcon} />
        </div>
      </div>
      <form>
        <activeTabContent.component />
        <div className={styles.createEventMain__arrowButtons}>
          <button
            disabled={activeTabIndex === 0}
            onClick={() => changeActiveTab(true)}
            type="button"
            className={styles.createEventMain__arrowBtn}
          >
            <Svg
              id={arrowLeftIcon}
              className={styles.createEventMain__arrowIcon}
            />
          </button>
          <button
            disabled={activeTabIndex === CREATE_EVENT_TABS_ARRAY.length - 1}
            onClick={() => changeActiveTab()}
            type="button"
            className={styles.createEventMain__arrowBtn}
          >
            <Svg
              id={arrowRightIcon}
              className={styles.createEventMain__arrowIcon}
            />
          </button>
        </div>
        <MainBtn className={styles.createEventMain__saveBtn}>Save</MainBtn>
      </form>
    </article>
  );
};

export default CreateEventMain;
