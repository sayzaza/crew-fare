import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFormValue } from "../../../hooks/useFormValue";
import { getNextMonthDate } from "../../../utils/functions/getNextMonthDate";
import { validateField } from "../../../utils/functions/validateField";

import Svg from "../../layout/Svg/Svg";
import MainBtn from "../../layout/MainBtn/MainBtn";

import { IEvent } from "../../../models/IEvent";
import { IEventTax } from "../../../models/IEventTax";
import { EventTypes } from "../../../constants/EventTypes";
import { createEventFieldErrorNames } from "../../../constants/createEventFieldErrorNames";
import {
  CREATE_EVENT_TABS,
  CREATE_EVENT_TABS_ARRAY,
  ECreateEventTabKeys,
} from "../../../constants/createEventTabs";
import { alertIcon, arrowLeftIcon, arrowRightIcon } from "../../../assets/svg";
import styles from "./CreateEventMain.module.scss";

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
  const [today, nextMonth] = getNextMonthDate();
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
    featuredHotelsTitle: "Featured hotels",
    minNights: 1,
    bookableStartDate: today,
    bookableEndDate: nextMonth,
    checkInDate: today,
    checkOutDate: nextMonth,
    startEndDates: [{ start: today, end: nextMonth, id: uuidv4() }],
    taxes: [],
  };
  const {
    formData,
    onChange,
    onChangeSelect,
    error,
    setError,
    clearInputError,
  } = useFormValue(initialData);

  const activeTabContent = CREATE_EVENT_TABS[activeTab];
  const activeTabIndex = CREATE_EVENT_TABS_ARRAY.findIndex(
    (tab) => tab.key === activeTab
  );
  const inActivetabExistErrors = !!activeTabContent.fields.find(
    (item) => error[item]
  );
  const [isBtnShaking, setIsBtnShaking] = useState(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const data = formData;
    if (data.minNights) data.minNights = +data.minNights;
    // validate form

    const fieldErrors = Object.keys(formData).reduce((acc, cur) => {
      const key = cur as keyof IEvent;
      // validate input[type=text/number]
      if (
        cur in createEventFieldErrorNames &&
        createEventFieldErrorNames[key]
      ) {
        if (key === "overlayTitle" && !formData.titleOnBanner) {
          return acc;
        }

        const validateError = validateField(
          formData[key],
          createEventFieldErrorNames[key] as string
        );

        if (validateError) acc[key] = validateError;
      }

      // validate banner
      if (key === "banner" && !formData[key]) {
        acc[key] = `Please upload banner image`;
      }

      // validate taxes
      if (key === "taxes") {
        const erroredTax = formData[key].find((tax) => {
          return Object.keys(tax).filter((taxKey) =>
            validateField(tax[taxKey as keyof IEventTax], "tax")
          ).length;
        });
        if (erroredTax) {
          acc[key] = "error";
        }
      }

      // validate link
      if (key === "link") {
        const linkRegex = /^[a-zA-Z0-9-]+$/;
        if (!linkRegex.test(formData.link)) {
          acc[key] = "Link can only contain letters, numbers, and dashes.";
        }
      }

      return acc;
    }, {} as typeof error);

    if (Object.values(fieldErrors).find((item) => item)) {
      setError(fieldErrors);

      // shake save button
      setIsBtnShaking(true);
      setTimeout(() => {
        setIsBtnShaking(false);
      }, 300);
    } else {
      alert("Submitted");
    }
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
          clearInputError={clearInputError}
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
        <MainBtn
          className={`${styles.createEventMain__saveBtn} ${
            isBtnShaking ? styles.createEventMain__saveBtn_shake : ""
          }`}
        >
          Save
        </MainBtn>
      </form>
    </article>
  );
};

export default CreateEventMain;
