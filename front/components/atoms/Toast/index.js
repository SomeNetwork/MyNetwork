import PropTypes from "prop-types";
import React from "react";
import { Card, Text } from "..";
import styles from "./Toast.module.scss";
import {
  CheckCircle as SuccessIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  HighlightOff as HighlightOffIcon,
} from "@material-ui/icons";

const Toast = (props) => {
  const { variant, text, onClick, onClose, hidden } = props;

  const handleClose = (event) => {
    onClose();
    event.stopPropagation();
    event.preventDefault();
  };
  const handleClick = (event) => {
    onClick();
    onClose();
    event.preventDefault();
  };

  const iconVariant =
    variant === "success" ? (
      <SuccessIcon />
    ) : variant === "info" ? (
      <InfoIcon />
    ) : variant === "warning" ? (
      <WarningIcon />
    ) : variant === "error" ? (
      <ErrorIcon />
    ) : (
      "*"
    );
  return (
    <>
      <Card
        className={`${styles[`em-${variant}`]} ${
          onClick ? styles["clickable"] : ""
        } ${hidden ? styles["hidden"] : ""}`}
        onClick={onClick && handleClick}
      >
        {iconVariant}
        <Text variant="body2">{text}</Text>
        <span onClick={handleClose}>
          <HighlightOffIcon />
        </span>
      </Card>
    </>
  );
  // return <div className={`${styles[`em-${variant}`]}`}>{text}</div>;
};

Toast.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(["success", "info", "warning", "error"]),
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  hidden: PropTypes.bool,
};

Toast.defaultProps = {
  variant: "info",
  hidden: false,
};

export default Toast;
