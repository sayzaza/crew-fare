import React, { useEffect, useRef, useState } from "react";

import styles from "./Select.module.scss";
import { ISelectOption } from "../../../models/UI/ISelectOption";
import Svg from "../Svg/Svg";
import { arrowDownIcon } from "../../../assets/svg";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";

interface Props {
  values: ISelectOption[];
  onChange: (value: string) => void;
  selectedValue: string;
  isInvlaid?: boolean;
}

const Select: React.FC<Props> = ({
  values,
  onChange,
  selectedValue,
  isInvlaid,
}) => {
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const dropDownOpenedRef = useRef(dropdownOpened);

  const onCloseDropdown = () => {
    setDropdownOpened(false);
  };

  useEffect(() => {
    dropDownOpenedRef.current = dropdownOpened;
  }, [dropdownOpened]);

  useEffect(() => {
    const ref = [selectRef];
    const checkIfClickedOutside = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isRef = ref.every(
        (value) => value.current && !value.current.contains(el)
      );

      if (dropDownOpenedRef.current && isRef) {
        onCloseDropdown();
      }
    };
    document.addEventListener("click", checkIfClickedOutside);

    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, []);

  const selectedItem = values.find((item) => item.value === selectedValue);

  return (
    <div className={styles.select} ref={selectRef}>
      <button
        type="button"
        className={`${styles.select__dropdownBtn} ${
          isInvlaid ? styles.select__dropdownBtn_invalid : ""
        }`}
        onClick={() => setDropdownOpened((prevState) => !prevState)}
      >
        <span>{selectedItem?.name}</span>
        <Svg
          id={arrowDownIcon}
          className={`${styles.select__arrowDownIcon} ${
            dropdownOpened ? styles.select__arrowDownIcon_reversed : ""
          }`}
        />
      </button>
      <TransitionProvider
        duration={300}
        className={styles.select__dropdownContent}
        style={TransitionStyleTypes.opacity}
        inProp={dropdownOpened}
      >
        {values
          .filter((item) => item.value !== selectedValue)
          .map((item) => (
            <button
              type="button"
              className={styles.select__dropdownItem}
              key={item.value}
              onClick={() => {
                onChange(item.value);
                onCloseDropdown();
              }}
            >
              {item.name}
            </button>
          ))}
      </TransitionProvider>
    </div>
  );
};

export default Select;
