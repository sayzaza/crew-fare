import styles from "./MainInput.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  isInvalid?: boolean;
}

const MainInput = ({ className, isInvalid, placeholder, ...attrs }: Props) => {
  return (
    <input
      placeholder={placeholder || "Type here"}
      className={`${styles.mainInput} ${
        isInvalid ? styles.mainInput_invalid : ""
      } ${className || ""}`}
      {...attrs}
    />
  );
};

export default MainInput;
