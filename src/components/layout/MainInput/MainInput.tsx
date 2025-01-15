import styles from "./MainInput.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  isInvalid?: boolean;
}

const MainInput = ({ className, isInvalid, ...attrs }: Props) => {
  return (
    <input
      className={`${styles.mainInput} ${
        isInvalid ? styles.mainInput_invalid : ""
      } ${className || ""}`}
      {...attrs}
    />
  );
};

export default MainInput;
