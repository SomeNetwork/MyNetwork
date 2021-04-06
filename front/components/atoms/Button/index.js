import React from "react";
import styles from "./Button.module.scss";
import PropTypes from "prop-types";

const Button = (props) => {
  const { children, variant, onClick, text, fluid, animated, size } = props;
  return (
    <button
      className={`${styles[`btn-${variant || "primary"}`]} ${
        fluid ? "fluid" : ""
      } ${animated ? styles["animated"] : ""} ${size ? styles[size] : ""}`}
      onClick={onClick}
    >
      {text || children}
    </button>
  );
};

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
};

Button.propTypes = ButtonPropTypes;

Button.defaultProps = {
  animated: false,
  size: "normal",
};

export default Button;
