import React from "react";
import styles from "./Button.module.scss";
import PropTypes from "prop-types";

const Button = (props) => {
  const { children, variant, onClick, text, fluid } = props;
  return (
    <button
      className={`${styles[`btn-${variant || "primary"}`]} ${
        fluid ? "fluid" : ""
      }`}
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
};

Button.propTypes = ButtonPropTypes;

export default Button;
