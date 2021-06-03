import React from "react";
import styles from "./Input.module.scss";
import PropTypes from "prop-types";

const Input = (props) => {
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
        onChange={(oEvent) => onChange && onChange(oEvent.target.value)}
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

export const InputPropTypes = {
  children: PropTypes.oneOf([null]),
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([false])]),
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(["text", "number", "email", "password", null]),
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  variant: PropTypes.oneOf(["outlined"]),
  htmlProps: PropTypes.object,
  required: PropTypes.bool,
  fluid: PropTypes.bool,
};
Input.propTypes = InputPropTypes;

Input.defaultProps = {
  value: "",
  required: false,
  fluid: false,
};

export default Input;
