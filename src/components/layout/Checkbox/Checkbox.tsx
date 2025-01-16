import React, { ReactNode } from "react";

import styles from "./Checkbox.module.scss";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className?: string;
  name: string;
  children: ReactNode;
  checked: boolean;
}

const Checkbox: React.FC<Props> = ({
  onChange,
  value,
  className,
  name,
  children,
  checked,
}) => {
  return (
    <div className={className ? className : ""}>
      <input
        onChange={(e) => onChange(e)}
        value={value}
        id={value + name + "Checkbox"}
        type="checkbox"
        checked={checked}
        className={styles.checkbox__input}
      />
      <label
        htmlFor={value + name + "Checkbox"}
        className={`${styles.checkbox__label}`}
      >
        {children}
      </label>
    </div>
  );
};

export default Checkbox;
