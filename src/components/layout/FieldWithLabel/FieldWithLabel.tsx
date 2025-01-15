import React, { ReactNode } from "react";

import styles from "./FieldWithLabel.module.scss";

interface Props {
  children: ReactNode;
  label: ReactNode;
  asDiv?: boolean;
  error?: string;
}

const FieldWithLabel: React.FC<Props> = ({ label, children, asDiv, error }) => {
  const Label = asDiv ? "div" : "label";

  return (
    <Label className={styles.fieldWithLabel}>
      <span className={styles.fieldWithLabel__text}>{label}</span>
      {children}
      <span
        className={`${styles.fieldWithLabel__errorTxt} ${
          error ? styles.fieldWithLabel__errorTxt_show : ""
        }`}
      >
        {error || "\u00A0"}
      </span>
    </Label>
  );
};

export default FieldWithLabel;
