import React from "react";
import styles from "./Input.module.scss";

export interface InputProps {
  // children: null | undefined;
  error?: string | false;
  label: string;
  name: string;
  onChange: (value: string | number) => void;
  type: "text" | "number" | "email" | "password";
  value: string | number ;
  variant?: "outlined";
  htmlProps?: React.HTMLProps<HTMLInputElement>;
  // htmlProps: any;
  required: boolean;
  fluid: boolean;
}

const Input = (props: InputProps) => {
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
        value={value}
        className={`${styles[`inp-${variant || "outlined"}`]} ${
          error ? styles["error"] : ""
        } ${fluid ? styles["fluid"] : ""}`}
        type={type || "text"}
        onChange={handleChange}
        {...htmlProps}
        autoComplete={"false"}
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
};

Input.defaultProps = {
  value: "",
  required: false,
  fluid: false,
  variant: "outlined",
};

export default Input;
