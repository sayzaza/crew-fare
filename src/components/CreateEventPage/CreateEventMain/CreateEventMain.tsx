import React, { useEffect } from "react";

import styles from "./CreateEventMain.module.scss";
import Svg from "../../layout/Svg/Svg";
import { alertIcon, arrowLeftIcon, arrowRightIcon } from "../../../assets/svg";
import MainBtn from "../../layout/MainBtn/MainBtn";
import {
  CREATE_EVENT_TABS,
  CREATE_EVENT_TABS_ARRAY,
  ECreateEventTabKeys,
} from "../../../constants/createEventTabs";
import { useFormValue } from "../../../hooks/useFormValue";
import { EventTypes } from "../../../constants/EventTypes";
import { IEvent } from "../../../models/IEvent";
import { stringify } from "querystring";

interface Props {
  activeTab: ECreateEventTabKeys;
  changeActiveTab: (changeToPrev?: boolean) => void;
  setErrors: (keys: ECreateEventTabKeys[]) => void;
  erroredTabs: ECreateEventTabKeys[];
}

const CreateEventMain: React.FC<Props> = ({
  activeTab,
  changeActiveTab,
  setErrors,
  erroredTabs,
}) => {
  const initialData: IEvent = {
    actionType: "enable",
    type: EventTypes.PUBLIC,
    name: "",
    banner: "",
    titleOnBanner: false,
    overlayTitle: "",
    link: "",
    address: "",
    venue: "",
    featuredHotelsTitle: "",
    minLength: 1,
    bookableStartDate: "",
    bookableEndDate: "",
    checkInDate: "",
    checkOutDate: "",
    startEndDates: [],
    taxes: [],
  };
  const { formData, onChange, onChangeSelect, error, setError } =
    useFormValue(initialData);

  const activeTabContent = CREATE_EVENT_TABS[activeTab];
  const activeTabIndex = CREATE_EVENT_TABS_ARRAY.findIndex(
    (tab) => tab.key === activeTab
  );

  const inActivetabExistErrors = !!activeTabContent.fields.find(
    (item) => error[item]
  );

  useEffect(() => {
    const erroredFields = Object.keys(error).filter(
      (item) => error[item as keyof typeof error]
    );
    const updatingErrors = CREATE_EVENT_TABS_ARRAY.filter((tab) =>
      tab.fields.find((field) => erroredFields.includes(field))
    ).map((item) => item.key);

    if (
      JSON.stringify(erroredTabs.sort()) !==
      JSON.stringify(updatingErrors.sort())
    ) {
      setErrors(updatingErrors);
    }
  }, [error]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setError((prevState) => ({
      ...prevState,
      banner: "Inavlid banner",
    }));
  };

  return (
    <article className={styles.createEventMain}>
      <div className={styles.createEventMain__titleBlock}>
        <h3 className={styles.createEventMain__title}>
          {activeTabContent.title}
        </h3>
        {inActivetabExistErrors && (
          <div className={styles.createEventMain__alert}>
            <Svg id={alertIcon} className={styles.createEventMain__alertIcon} />
          </div>
        )}
      </div>
      <form onSubmit={onSubmit}>
        <activeTabContent.component
          onChange={onChange}
          formData={formData}
          onChangeSelect={onChangeSelect}
          error={error}
        />
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
