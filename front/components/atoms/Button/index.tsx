import React from "react";
import styles from "./Button.module.scss";
import PropTypes from "prop-types";

export type ButtonProps = {
  variant: "primary" | "secondary" | "success" | "warning" | "error";
  // children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: string | React.ReactNode;
  // children: any,
  text: string;
  onClick: () => void;
  fluid: boolean;
  animated: boolean;
  size: "small" | "normal" | "huge";
  disabled: boolean;
};

const Button = (props: ButtonProps) => {
  const {
    children,
    variant,
    onClick,
    text,
    fluid,
    animated,
    size,
    disabled,
  } = props;
  return (
    <button
      className={`${styles[`btn-${variant || "primary"}`]} ${
        fluid ? "fluid" : ""
      } ${animated ? styles["animated"] : ""} ${size ? styles[size] : ""} ${
        disabled ? styles["disabled"] : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text || children}
    </button>
  );
};

// FIXME: Delete after ts refactoring
export const ButtonPropTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "error",
  ]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  text: PropTypes.string,
  onClick: PropTypes.func,
  fluid: PropTypes.bool,
  animated: PropTypes.bool,
  size: PropTypes.oneOf(["small", "normal", "huge"]),
  disabled: PropTypes.bool.isRequired,
};

Button.defaultProps = {
  animated: false,
  size: "normal",
  disabled: false,
};

export default Button;
