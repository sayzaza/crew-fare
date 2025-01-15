import React, { ReactNode } from "react";

import styles from "./CreateEventFieldsWrapper.module.scss";

interface Props {
  children: ReactNode;
  className?: string
}

const CreateEventFieldsWrapper: React.FC<Props> = ({ children,className }) => {
  return <div className={`${styles.createEventFieldsWrapper} ${className || ""}`}>{children}</div>;
};

export default CreateEventFieldsWrapper;
