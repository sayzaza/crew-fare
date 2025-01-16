import React from "react";
import { v4 } from "uuid";
import {
  validateDateByBookableDates,
  validateField,
} from "../../../../utils/functions/validate";
import { getNextMonthDate } from "../../../../utils/functions/getNextMonthDate";

import CreateEventFieldsWrapper from "../CreateEventFieldsWrapper/CreateEventFieldsWrapper";
import FieldWithLabel from "../../../layout/FieldWithLabel/FieldWithLabel";
import Svg from "../../../layout/Svg/Svg";
import DatesSelector from "../../../layout/DatesSelector/DatesSelector";
import MainInput from "../../../layout/MainInput/MainInput";
import Select from "../../../layout/Select/Select";

import { ISelectOption } from "../../../../models/UI/ISelectOption";
import { IEventTax } from "../../../../models/IEventTax";
import { CreateEventTabProps } from "../../../../constants/createEventTabs";
import { tooltipFootImage } from "../../../../assets/images";
import { infoIcon, plusIcon, trashIcon } from "../../../../assets/svg";
import styles from "./CreateEventDatesForm.module.scss";
import { IEvent } from "../../../../models/IEvent";

type EventDateTypeKey = keyof IEvent["startEndDates"][0];

const taxTypeOptions: ISelectOption[] = [
  {
    name: "Fixed",
    value: "fixed",
  },
  {
    name: "Percentage",
    value: "percentage",
  },
];

const CreateEventDatesForm: React.FC<CreateEventTabProps> = ({
  clearInputError,
  onChangeSelect,
  formData,
  error,
}) => {
  const checkStartEndDatesvalidity = () => {
    const erroredDate = formData.startEndDates.find((date) => {
      return (
        Object.keys(date).filter((dateKey) =>
          validateField(date[dateKey as EventDateTypeKey], "date")
        ).length ||
        validateDateByBookableDates(
          [date.start, date.end],
          ["start date", "end date"],
          [formData.bookableStartDate, formData.bookableEndDate]
        )
      );
    });
    if (!erroredDate) clearInputError("startEndDates");
  };

  const onChangeStartEndDate = (
    date: Date,
    index: number,
    isEndDate?: boolean
  ) => {
    const updateingStartEndDates = [...formData.startEndDates];

    if (!updateingStartEndDates[index]) return;
    const conditionKey = isEndDate ? "end" : "start";
    updateingStartEndDates[index][conditionKey] = date;

    onChangeSelect("startEndDates", updateingStartEndDates, false);

    // validate
    checkStartEndDatesvalidity();
  };
  const onDeleteStartEndDate = (index: number) => {
    const updateingStartEndDates = [...formData.startEndDates].filter(
      (item, i) => index !== i
    );

    onChangeSelect("startEndDates", updateingStartEndDates, false);
    checkStartEndDatesvalidity();
  };
  const onAddStartEndDate = () => {
    const [start, end] = getNextMonthDate();
    const updateingStartEndDates = [
      ...formData.startEndDates,
      { start, end, id: v4() },
    ];

    onChangeSelect("startEndDates", updateingStartEndDates, false);
  };

  const checkTaxesValidity = (taxes: IEventTax[]) => {
    const erroredField = taxes.find((tax) => {
      return Object.keys(tax).filter((taxKey) =>
        validateField(tax[taxKey as keyof IEventTax], "tax")
      ).length;
    });

    if (!erroredField) clearInputError("taxes");
  };

  const updateTaxItem = (
    key: keyof IEventTax,
    value: string | number,
    index: number
  ) => {
    const updatingData = [...formData.taxes];
    updatingData[index] = {
      ...updatingData[index],
      [key]: value,
    };
    onChangeSelect("taxes", updatingData, false);
    checkTaxesValidity(updatingData);
  };

  const addTaxItem = () => {
    const updatingData = [
      ...formData.taxes,
      { name: "", type: "fixed", amount: 0, id: v4() },
    ];
    onChangeSelect("taxes", updatingData, false);
  };

  const removeTaxItem = (index: number) => {
    const updatingData = [...formData.taxes].filter((_, i) => i !== index);
    onChangeSelect("taxes", updatingData, false);
    checkTaxesValidity(updatingData);
  };

  return (
    <div className={styles.createEventDatesForm}>
      <CreateEventFieldsWrapper
        className={styles.createEventDatesForm__fieldsWrapper}
      >
        <FieldWithLabel
          error={error.bookableStartDate || error.bookableEndDate}
          label={
            <>
              <span>Bookable Start & End Dates</span>
              <div className={styles.createEventDatesForm__info}>
                <Svg
                  id={infoIcon}
                  className={styles.createEventDatesForm__infoIcon}
                />
                <div className={styles.createEventDatesForm__tooltip}>
                  <p className={styles.createEventDatesForm__tooltipTxt}>
                    Lorem ipsum dolor sit amet consectetur. Urna ac duis a
                    gravida.
                  </p>
                  <img
                    src={tooltipFootImage}
                    alt="tooltip"
                    className={styles.createEventDatesForm__tooltipFootImg}
                  />
                </div>
              </div>
            </>
          }
          asDiv
        >
          <DatesSelector
            isInvalid={!!(error.bookableStartDate || error.bookableEndDate)}
            startDateValue={formData.bookableStartDate}
            endDateValue={formData.bookableEndDate}
            onChangeStartDate={(date) =>
              onChangeSelect("bookableStartDate", date)
            }
            onChangeEndDate={(date) => onChangeSelect("bookableEndDate", date)}
          />
        </FieldWithLabel>
        <div className={styles.createEventDatesForm__startEndDatesWrapper}>
          <FieldWithLabel label="Event Start and End Dates" asDiv withoutError>
            <div className={styles.createEventDatesForm__startEndDatesList}>
              {formData.startEndDates.map(({ start, end, id }, index) => {
                const errorText =
                  error.startEndDates &&
                  (validateField(start, "start date") ||
                    validateField(end, "end date") ||
                    validateDateByBookableDates(
                      [start, end],
                      ["start date", "end date"],
                      [formData.bookableStartDate, formData.bookableEndDate]
                    ));
                return (
                  <FieldWithLabel label="" asDiv error={errorText}>
                    <div
                      className={styles.createEventDatesForm__startEndDateCol}
                      key={id}
                    >
                      <DatesSelector
                        isInvalid={!!errorText}
                        disabled={
                          !formData.bookableEndDate ||
                          !formData.bookableStartDate
                        }
                        startDateValue={start}
                        endDateValue={end}
                        onChangeStartDate={(date) =>
                          onChangeStartEndDate(date, index)
                        }
                        onChangeEndDate={(date) =>
                          onChangeStartEndDate(date, index, true)
                        }
                      />
                      <button
                        disabled={formData.startEndDates.length <= 1}
                        type="button"
                        onClick={() => onDeleteStartEndDate(index)}
                        className={styles.createEventDatesForm__deleteBtn}
                      >
                        <Svg
                          id={trashIcon}
                          className={styles.createEventDatesForm__deleteIcon}
                        />
                      </button>
                    </div>
                  </FieldWithLabel>
                );
              })}
            </div>
          </FieldWithLabel>
          <button
            disabled={!formData.bookableEndDate || !formData.bookableStartDate}
            type="button"
            onClick={onAddStartEndDate}
            className={styles.createEventDatesForm__addBtn}
          >
            <Svg
              id={plusIcon}
              className={styles.createEventDatesForm__addBtnPlusIcon}
            />
            <span>Add Event Date Range</span>
          </button>
        </div>
        <FieldWithLabel
          label={"Default Check-In & Check-Out Dates"}
          error={error.checkInDate || error.checkOutDate}
          asDiv
        >
          <DatesSelector
            isInvalid={!!(error.checkInDate || error.checkOutDate)}
            disabled={!formData.bookableEndDate || !formData.bookableStartDate}
            startDateValue={formData.checkInDate}
            endDateValue={formData.checkOutDate}
            onChangeStartDate={(date) => onChangeSelect("checkInDate", date)}
            onChangeEndDate={(date) => onChangeSelect("checkOutDate", date)}
          />
        </FieldWithLabel>
      </CreateEventFieldsWrapper>
      <div className={styles.createEventDatesForm__taxesWrapper}>
        <FieldWithLabel label="Taxes & Fees" asDiv withoutError>
          <div className={styles.createEventDatesForm__taxesList}>
            {formData.taxes.map(({ name, type, amount, id }, index) => (
              <div className={styles.createEventDatesForm__taxCol} key={id}>
                <FieldWithLabel
                  error={error.taxes && validateField(name, "name")}
                  label="Name"
                >
                  <MainInput
                    onChange={(e) =>
                      updateTaxItem("name", e.target.value, index)
                    }
                    isInvalid={!!(error.taxes && validateField(name, "name"))}
                    value={name}
                  />
                </FieldWithLabel>
                <FieldWithLabel
                  error={error.taxes && validateField(+amount, "amount")}
                  label="Amount"
                >
                  <MainInput
                    onChange={(e) => {
                      if (/^\d*\.?\d*$/.test(e.target.value.replace("%", ""))) {
                        updateTaxItem(
                          "amount",
                          e.target.value.replace("%", ""),
                          index
                        );
                      }
                    }}
                    value={`${amount}${type === "percentage" ? "%" : ""}`}
                    isInvalid={
                      !!(error.taxes && validateField(+amount, "amount"))
                    }
                  />
                </FieldWithLabel>
                <FieldWithLabel label={"Type"} asDiv>
                  <Select
                    values={taxTypeOptions}
                    onChange={(value) => updateTaxItem("type", value, index)}
                    selectedValue={type}
                  />
                </FieldWithLabel>
                <FieldWithLabel
                  label={"\u00A0"}
                  asDiv
                  className={styles.createEventDatesForm__deleteBtnWrapper}
                >
                  <button
                    disabled={formData.taxes.length <= 1}
                    type="button"
                    onClick={() => removeTaxItem(index)}
                    className={styles.createEventDatesForm__deleteBtn}
                  >
                    <Svg
                      id={trashIcon}
                      className={styles.createEventDatesForm__deleteIcon}
                    />
                  </button>
                </FieldWithLabel>
              </div>
            ))}
          </div>
        </FieldWithLabel>
        <button
          type="button"
          onClick={addTaxItem}
          className={styles.createEventDatesForm__addBtn}
        >
          <Svg
            id={plusIcon}
            className={styles.createEventDatesForm__addBtnPlusIcon}
          />
          <span>Add New Tax/Fee</span>
        </button>
      </div>
    </div>
  );
};

export default CreateEventDatesForm;
