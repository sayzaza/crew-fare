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

interface Props {}

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

const CreateEventBasicInfoForm: React.FC<Props> = (props) => {
  return (
    <CreateEventFieldsWrapper className={styles.createEventBasicInfoForm}>
      <div className={styles.createEventBasicInfoForm__typeSwitcher}>
        <button
          className={`${styles.createEventBasicInfoForm__typeSwitcherBtn} ${styles.createEventBasicInfoForm__typeSwitcherBtn_active}`}
        >
          Enable Event
        </button>
        <button className={styles.createEventBasicInfoForm__typeSwitcherBtn}>
          Disable Event
        </button>
      </div>
      <div className={styles.createEventBasicInfoForm__fieldsCol}>
        <FieldWithLabel label={"Event Type"}>
          <Select
            values={eventTypeOptions}
            onChange={(value) => {}}
            selectedValue={""}
          />
        </FieldWithLabel>
        <FieldWithLabel label={"Event Name"}>
          <MainInput placeholder="Type here" />
        </FieldWithLabel>
      </div>
      <FieldWithLabel label={"Banner"} asDiv>
        <label className={styles.createEventBasicInfoForm__uploadArea}>
          <div className={styles.createEventBasicInfoForm__uploadAreaInner}>
            <Svg
              id={uploadIcon}
              className={styles.createEventBasicInfoForm__uploadIcon}
            />
            <h6 className={styles.createEventBasicInfoForm__uploadTxt}>
              Click or drop image
            </h6>
          </div>
        <input
          type="file"
          className={styles.createEventBasicInfoForm__fileInput}
        />
        </label>
      </FieldWithLabel>
      <Checkbox onChange={(e) => {}} value={""} name={"overlay"} checked={true}>
        Overlay Title on Banner
      </Checkbox>
    </CreateEventFieldsWrapper>
  );
};

export default CreateEventBasicInfoForm;
