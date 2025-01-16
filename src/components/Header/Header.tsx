import React from "react";

import Svg from "../layout/Svg/Svg";

import { logoIcon } from "../../assets/svg";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Svg id={logoIcon} className={styles.header__logo} />
    </header>
  );
};

export default Header;
