import React, { FC, memo, ReactNode } from "react";

import styles from "./MainBtn.module.scss";

type MainBtnProps = {
  className?: string;
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const MainBtn: FC<MainBtnProps> = memo(
  ({ className, children, ...properties }) => {
    return (
      <button
        className={`${styles.mainBtn} ${className || ""}`}
        {...properties}
      >
        {children}
      </button>
    );
  }
);

export default MainBtn;
