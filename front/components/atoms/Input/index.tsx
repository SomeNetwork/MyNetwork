import React, { forwardRef } from "react";
import styles from "./Input.module.scss";

enum InputVariants {
  "outlined" = "outlined",
}
enum InputTypes {
  "text" = "text",
  "number" = "number",
  "email" = "email",
  "password" = "password",
}
export interface InputProps {
  // children: null | undefined;
  error?: string | false;
  label?: string;
  name: string;
  onChange: (value: string | number) => void;
  type?: InputTypes;
  value: string | number;
  variant?: InputVariants;
  htmlProps?: React.HTMLProps<HTMLInputElement>;
  // htmlProps: any;
  required?: boolean;
  fluid?: boolean;
  placeholder?: string;
  iconStart?: any;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  props: InputProps,
  inputRef
) {
  const {
    variant,
    label,
    type,
    value,
    onChange,
    error,
    htmlProps,
    required,
    fluid,
    placeholder,
  } = props;

  //TODO: input(number): e, -, +,...
  // const onKeyDown = (oEvent) => {
  //   switch (type) {
  //     case "number":
  //       if (["e"].includes(oEvent.key)) oEvent.preventDefault();
  //       // if (oEvent.key == "-" && value === "") onChange(1);
  //       break;

  //     default:
  //       break;
  //   }
  // };

  const handleChange = (oEvent: React.ChangeEvent<HTMLInputElement>): void => {
    if (onChange) onChange(oEvent.target.value);
  };

  return (
    <div
      className={`${styles["inp-container"]} ${error ? styles["error"] : ""} ${
        fluid ? styles["fluid"] : ""
      }`}
    >
      <input
        ref={inputRef}
        value={value}
        className={`${styles[`inp-${variant || "outlined"}`]} ${
          error ? styles["error"] : ""
        } ${fluid ? styles["fluid"] : ""}`}
        type={type || "text"}
        onChange={handleChange}
        {...htmlProps}
        autoComplete={"false"}
        placeholder={placeholder || ""}
        // onKeyDown={onKeyDown}
      />
      <label
        className={`${styles["inp-title"]} 
        ${required ? styles[`required`] : ""} 
      `}
      >
        {label}
      </label>
      <label
        className={`${styles["inp-errortext"]} ${error ? styles["show"] : ""}`}
      >
        {error || ""}
      </label>
    </div>
  );
});

Input.defaultProps = {
  value: "",
  required: false,
  fluid: false,
  variant: InputVariants.outlined,
  type: InputTypes.text,
};

export default Input;
