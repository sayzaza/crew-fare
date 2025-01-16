import React, { useEffect, useRef, useState } from "react";
import { formatDate } from "../../../utils/functions/formatDate";
import Calendar from "react-calendar";

import Svg from "../Svg/Svg";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";

import {
  arrowLeftIcon,
  arrowRightIcon,
  calendarIcon,
} from "../../../assets/svg";
import "react-calendar/dist/Calendar.css";
import styles from "./DatesSelector.module.scss";

interface Props {
  startDateValue: Date | "";
  endDateValue: Date | "";
  onChangeStartDate: (date: Date) => void;
  onChangeEndDate: (date: Date) => void;
  disabled?: boolean;
  isInvalid?: boolean;
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getDateYearAndMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];

  return `${year} ${month}`;
};

const DatesSelector: React.FC<Props> = ({
  startDateValue,
  endDateValue,
  onChangeStartDate,
  onChangeEndDate,
  disabled,
  isInvalid
}) => {
  const [calendarsOpened, setCalendarsOpened] = useState(false);

  // Initialize startDate and endDate as null if values are falsy
  const [startDate, setStartDate] = useState<Date | null>(
    startDateValue ? new Date(startDateValue) : null
  );
  const nextMonthDate = new Date();
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
  const [endDate, setEndDate] = useState<Date | null>(
    endDateValue ? new Date(endDateValue) : null
  );

  const startActiveDateValue = startDate ? new Date(startDate) : new Date();
  startActiveDateValue.setDate(1);
  const [startActiveDate, setStartActiveDate] = useState(startActiveDateValue);

  const calendarRef = useRef<null | HTMLDivElement>(null);
  const calendarOpenedRef = useRef(calendarsOpened);

  useEffect(() => {
    const ref = [calendarRef];
    const checkIfClickedOutside = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isRef = ref.every(
        (value) => value.current && !value.current.contains(el)
      );

      if (calendarOpenedRef.current && isRef) {
        setCalendarsOpened(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);

    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, []);

  const endActiveDate = startDate ? new Date(startActiveDate) : new Date();
  endActiveDate.setMonth(endActiveDate.getMonth() + 1);

  useEffect(() => {
    calendarOpenedRef.current = calendarsOpened;
  }, [calendarsOpened]);

  useEffect(() => {
    if (startDate) {
      onChangeStartDate(startDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate]);

  useEffect(() => {
    if (endDate) {
      onChangeEndDate(endDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endDate]);

  const onChangeActiveDate = (isPrev?: boolean) => {
    const changeNum = isPrev ? -1 : 1;

    const newStartDate = new Date(
      startActiveDate.getFullYear(),
      startActiveDate.getMonth() + changeNum,
      1
    );

    setStartActiveDate(newStartDate);
  };

  return (
    <div className={`${styles.datesSelector} ${isInvalid ? styles.datesSelector_invalid : ""}`} ref={calendarRef}>
      <span>
        {startDate && endDate
          ? `${formatDate(startDate)} - ${formatDate(endDate)}`
          : "Select Dates"}
      </span>
      <button
        disabled={disabled}
        type="button"
        onClick={() => setCalendarsOpened((prevState) => !prevState)}
        className={styles.datesSelector__calendarBtn}
      >
        <Svg id={calendarIcon} className={styles.datesSelector__calendarIcon} />
      </button>
      <TransitionProvider
        inProp={calendarsOpened}
        style={TransitionStyleTypes.opacity}
        className={styles.datesSelector__calendarModal}
      >
        <button
          type="button"
          onClick={() => onChangeActiveDate(true)}
          className={styles.datesSelector__calendarArrowBtn}
        >
          <Svg
            id={arrowLeftIcon}
            className={styles.datesSelector__calendarArrowIcon}
          />
        </button>
        <div className={styles.datesSelector__calendarWrapper}>
          <h5 className={styles.datesSelector__calendarTitle}>
            {startDate
              ? getDateYearAndMonth(startActiveDate)
              : "Select Start Date"}
          </h5>
          <Calendar
            onChange={(d) => setStartDate(d as Date)}
            value={startDate || new Date()}
            className={styles.datesSelector__calendar}
            tileClassName={styles.datesSelector__calendarTile}
            showNavigation={false}
            activeStartDate={startActiveDate}
          />
        </div>
        <div className={styles.datesSelector__calendarWrapper}>
          <h5 className={styles.datesSelector__calendarTitle}>
            {endDate ? getDateYearAndMonth(endActiveDate) : "Select End Date"}
          </h5>
          <Calendar
            onChange={(d) => {
              setEndDate(d as Date);
              setCalendarsOpened(false);
            }}
            value={endDate || new Date()}
            className={styles.datesSelector__calendar}
            tileClassName={styles.datesSelector__calendarTile}
            showNavigation={false}
            activeStartDate={endActiveDate}
          />
        </div>
        <button
          type="button"
          onClick={() => onChangeActiveDate()}
          className={styles.datesSelector__calendarArrowBtn}
        >
          <Svg
            id={arrowRightIcon}
            className={styles.datesSelector__calendarArrowIcon}
          />
        </button>
      </TransitionProvider>
    </div>
  );
};

export default DatesSelector;
