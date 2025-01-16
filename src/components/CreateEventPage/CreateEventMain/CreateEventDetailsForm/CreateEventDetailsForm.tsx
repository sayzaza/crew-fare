import React from "react";

import CreateEventFieldsWrapper from "../CreateEventFieldsWrapper/CreateEventFieldsWrapper";
import FieldWithLabel from "../../../layout/FieldWithLabel/FieldWithLabel";
import MainInput from "../../../layout/MainInput/MainInput";

import { CreateEventTabProps } from "../../../../constants/createEventTabs";
import styles from "./CreateEventDetailsForm.module.scss";

const CreateEventDetailsForm: React.FC<CreateEventTabProps> = ({
  error,
  formData,
  onChange,
  onChangeSelect,
}) => {
  return (
    <CreateEventFieldsWrapper className={styles.createEventDetailsForm}>
      <FieldWithLabel label={"Link"} error={error.link}>
        <MainInput
          onChange={onChange}
          placeholder="https://crewfare.com/events/event-name/"
          name="link"
          value={formData.link}
          isInvalid={!!error.link}
        />
      </FieldWithLabel>
      <div className={styles.createEventDetailsForm__col}>
        <FieldWithLabel label={"Event Address"} error={error.address}>
          <MainInput
            onChange={onChange}
            name="address"
            value={formData.address}
            isInvalid={!!error.address}
          />
        </FieldWithLabel>
        <FieldWithLabel label={"Venue Name"} error={error.venue}>
          <MainInput
            onChange={onChange}
            name="venue"
            value={formData.venue}
            isInvalid={!!error.venue}
          />
        </FieldWithLabel>
        <FieldWithLabel
          label={"Featured Hotels Title"}
          error={error.featuredHotelsTitle}
        >
          <MainInput
            onChange={onChange}
            name="featuredHotelsTitle"
            value={formData.featuredHotelsTitle}
            isInvalid={!!error.featuredHotelsTitle}
          />
        </FieldWithLabel>
        <FieldWithLabel label={"Minimum Nights"} error={error.minNights}>
          <MainInput
            showNumberStepBtns
            type="number"
            onChange={(e) => onChangeSelect("minNights", e.target.value,false)}
            name="minNights"
            value={formData.minNights}
            isInvalid={!!error.minNights}
          />
        </FieldWithLabel>
      </div>
    </CreateEventFieldsWrapper>
  );
};

export default CreateEventDetailsForm;
