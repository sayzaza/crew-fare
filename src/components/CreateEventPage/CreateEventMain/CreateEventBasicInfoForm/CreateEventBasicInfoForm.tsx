import React from "react";

import styles from "./CreateEventBasicInfoForm.module.scss";
import CreateEventFieldsWrapper from "../CreateEventFieldsWrapper/CreateEventFieldsWrapper";
import FieldWithLabel from "../../../layout/FieldWithLabel/FieldWithLabel";
import Select from "../../../layout/Select/Select";
import { ISelectOption } from "../../../../models/UI/ISelectOption";
import MainInput from "../../../layout/MainInput/MainInput";
import Svg from "../../../layout/Svg/Svg";
import { uploadIcon } from "../../../../assets/svg";
import Checkbox from "../../../layout/Checkbox/Checkbox";
import { IEvent } from "../../../../models/IEvent";
import { useFormValue } from "../../../../hooks/useFormValue";
import { CreateEventTabProps } from "../../../../constants/createEventTabs";
import { error } from "console";

type UseFormvalueReturnType = ReturnType<typeof useFormValue<IEvent>>;

const eventTypeOptions: ISelectOption[] = [
  {
    name: "Public Event",
    value: "public",
  },
  {
    name: "Private Event",
    value: "private",
  },
  {
    name: "Other Event",
    value: "other",
  },
];

const CreateEventBasicInfoForm: React.FC<CreateEventTabProps> = ({
  formData,
  onChange,
  onChangeSelect,
  error,
}) => {
  const onUploadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onChangeSelect("banner", URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <CreateEventFieldsWrapper className={styles.createEventBasicInfoForm}>
      <div className={styles.createEventBasicInfoForm__typeSwitcher}>
        <button
          type="button"
          onClick={() => onChangeSelect("actionType", "enable")}
          className={`${styles.createEventBasicInfoForm__typeSwitcherBtn} ${
            formData.actionType === "enable"
              ? styles.createEventBasicInfoForm__typeSwitcherBtn_active
              : ""
          }`}
        >
          Enable Event
        </button>
        <button
          type="button"
          onClick={() => onChangeSelect("actionType", "disable")}
          className={`${styles.createEventBasicInfoForm__typeSwitcherBtn} ${
            styles.createEventBasicInfoForm__typeSwitcherBtn
          } ${
            formData.actionType === "disable"
              ? styles.createEventBasicInfoForm__typeSwitcherBtn_active
              : ""
          }`}
        >
          Disable Event
        </button>
      </div>
      <div className={styles.createEventBasicInfoForm__fieldsCol}>
        <FieldWithLabel label={"Event Type"} asDiv>
          <Select
            values={eventTypeOptions}
            onChange={(value) => onChangeSelect("type", value)}
            selectedValue={formData.type}
          />
        </FieldWithLabel>
        <FieldWithLabel label={"Event Name"} error={error.name}>
          <MainInput
            onChange={onChange}
            name="name"
            value={formData.name}
            isInvalid={!!error.name}
          />
        </FieldWithLabel>
      </div>
      <FieldWithLabel label={"Banner"} asDiv error={error.banner}>
        <label className={styles.createEventBasicInfoForm__uploadArea}>
          <div
            style={{
              backgroundImage: formData.banner
                ? `url(${formData.banner})`
                : "unset",
            }}
            className={styles.createEventBasicInfoForm__uploadAreaInner}
          >
            {!formData.banner ? (
              <>
                <Svg
                  id={uploadIcon}
                  className={styles.createEventBasicInfoForm__uploadIcon}
                />
                <h6 className={styles.createEventBasicInfoForm__uploadTxt}>
                  Click or drop image
                </h6>
              </>
            ) : (
              <>
                {formData.titleOnBanner && (
                  <h3 className={styles.createEventBasicInfoForm__bannerTitle}>
                    {formData.overlayTitle}
                  </h3>
                )}
              </>
            )}
          </div>
          <input
            onClick={(e) => {
              (e.target as HTMLInputElement).value = "";
            }}
            onChange={onUploadImg}
            type="file"
            className={styles.createEventBasicInfoForm__fileInput}
          />
        </label>
      </FieldWithLabel>
      <Checkbox
        onChange={(e) => onChangeSelect("titleOnBanner", e.target.checked)}
        value={"titleOnBanner"}
        name={"overlay"}
        checked={formData.titleOnBanner}
      >
        Overlay Title on Banner
      </Checkbox>
      <div
        className={`${
          styles.createEventBasicInfoForm__overlayTitleFieldWrapper
        } ${
          formData.titleOnBanner
            ? styles.createEventBasicInfoForm__overlayTitleFieldWrapper_show
            : ""
        }`}
      >
        <FieldWithLabel label={"Overlay Title"} error={error.overlayTitle}>
          <MainInput
            isInvalid={!!error.overlayTitle}
            onChange={onChange}
            name="overlayTitle"
            value={formData.overlayTitle}
          />
        </FieldWithLabel>
      </div>
    </CreateEventFieldsWrapper>
  );
};

export default CreateEventBasicInfoForm;
