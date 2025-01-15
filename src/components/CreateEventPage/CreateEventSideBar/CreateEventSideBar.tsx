import React from "react";

import styles from "./CreateEventSideBar.module.scss";
import {
  CREATE_EVENT_TABS_ARRAY,
  ECreateEventTabKeys,
} from "../../../constants/createEventTabs";
import Svg from "../../layout/Svg/Svg";
import { alertIcon, checkboxIcon } from "../../../assets/svg";

interface Props {
  activeTab: ECreateEventTabKeys;
  errors: ECreateEventTabKeys[];
  changeActiveTab: (tab: ECreateEventTabKeys) => void;
}

const CreateEventSideBar: React.FC<Props> = ({
  activeTab,
  errors,
  changeActiveTab,
}) => {
  const activeTabIndex = CREATE_EVENT_TABS_ARRAY.findIndex(
    (tab) => tab.key === activeTab
  );
  
  return (
    <aside className={styles.createEventSideBar}>
      <h2 className={styles.createEventSideBar__title}>Create Event</h2>
      <nav className={styles.createEventSideBar__nav}>
        {CREATE_EVENT_TABS_ARRAY.map(({ key, title }, index) => (
          <button
            disabled={activeTab === key}
            onClick={() => changeActiveTab(key)}
            className={`${styles.createEventSideBar__button} ${
              activeTab === key ? styles.createEventSideBar__button_active : ""
            }`}
            key={key}
          >
            <div
              className={`${styles.createEventSideBar__indexWrapper} ${
                key === activeTab
                  ? styles.createEventSideBar__indexWrapper_active
                  : ""
              } ${
                index < activeTabIndex
                  ? styles.createEventSideBar__indexWrapper_completed
                  : ""
              }`}
            >
              {activeTabIndex > index ? (
                <Svg
                  id={checkboxIcon}
                  className={styles.createEventSideBar__checkboxIcon}
                />
              ) : (
                <span className={styles.createEventSideBar__indexTxt}>
                  {index + 1}
                </span>
              )}
            </div>
            <span className={styles.createEventSideBar__buttonText}>
              {title}
            </span>
            <div
              className={`${styles.createEventSideBar__alert} ${
                errors.includes(key)
                  ? styles.createEventSideBar__alert_show
                  : ""
              }`}
            >
              <Svg
                id={alertIcon}
                className={styles.createEventSideBar__alertIcon}
              />
            </div>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default CreateEventSideBar;
