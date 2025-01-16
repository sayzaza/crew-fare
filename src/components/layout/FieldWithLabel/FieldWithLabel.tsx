import React, { ReactNode } from "react";

import styles from "./FieldWithLabel.module.scss";

interface Props {
  children: ReactNode;
  label?: ReactNode;
  asDiv?: boolean;
  error?: string;
  withoutError?: boolean;
  className?: string;
}

const FieldWithLabel: React.FC<Props> = ({
  label,
  children,
  asDiv,
  error,
  withoutError,
  className,
}) => {
  const Label = asDiv ? "div" : "label";

  return (
    <Label className={`${styles.fieldWithLabel} ${className || ""}`}>
      {label && <span className={styles.fieldWithLabel__text}>{label}</span>}{" "}
      {children}
      {!withoutError && (
        <>
          <span
            className={`${styles.fieldWithLabel__errorTxt} ${
              error ? styles.fieldWithLabel__errorTxt_show : ""
            }`}
          >
            {"\u00A0"}
          </span>
          <div className={styles.fieldWithLabel__errorTxtWrapper}>
            <span
              className={`${styles.fieldWithLabel__errorTxt} ${
                error ? styles.fieldWithLabel__errorTxt_show : ""
              }`}
            >
              {error || "\u00A0"}
            </span>
          </div>
        </>
      )}
    </Label>
  );
};

export default FieldWithLabel;
