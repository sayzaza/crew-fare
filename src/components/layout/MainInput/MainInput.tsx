import { useRef } from "react";
import styles from "./MainInput.module.scss";
import { arrowDownImage, arrowTopImage } from "../../../assets/images";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  isInvalid?: boolean;
  showNumberStepBtns?: boolean;
}

const MainInput = ({
  className,
  isInvalid,
  placeholder,
  type,
  showNumberStepBtns,
  onChange,
  ...attrs
}: Props) => {
  const ref = useRef<HTMLInputElement | null>(null);

 const handleStepChange = (stepAction: "stepUp" | "stepDown") => {
  if (ref.current) {
    ref.current[stepAction](); // This changes the value
    if (onChange) {
      onChange({
        target: ref.current,
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }
};

  return (
    <div className={styles.mainInput}>
      {type === "number" && showNumberStepBtns && (
        <div className={styles.mainInput__numberArrows}>
          <button
            type="button"
            onClick={() => {
              if (ref.current) handleStepChange("stepUp");
            }}
            className={styles.mainInput__numberArrowBtn}
          >
            <img
              className={styles.mainInput__numberArrowIcon}
              src={arrowTopImage}
              alt="arrow top"
            />
          </button>
          <button
            type="button"
            onClick={() => {
              if (ref.current) handleStepChange("stepDown");
            }}
            className={styles.mainInput__numberArrowBtn}
          >
            <img
              className={styles.mainInput__numberArrowIcon}
              src={arrowDownImage}
              alt="arrow down"
            />
          </button>
        </div>
      )}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder || "Type here"}
        onChange={onChange}
        className={`${styles.mainInput__field} ${
          isInvalid ? styles.mainInput__field_invalid : ""
        } ${className || ""}`}
        {...attrs}
      />
    </div>
  );
};

export default MainInput;
