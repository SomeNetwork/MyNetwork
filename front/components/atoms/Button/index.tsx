import React from "react";
import styles from "./Button.module.scss";

export interface ButtonProps {
  variant?: "primary" | "secondary" | "success" | "warning" | "error";
  children?: string | React.ReactNode;
  // children: any,
  text: string;
  onClick: () => void;
  fluid?: boolean;
  animated?: boolean;
  size?: "small" | "normal" | "huge";
  disabled?: boolean;
}

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

Button.defaultProps = {
  animated: false,
  size: "normal",
  disabled: false,
};

export default Button;
