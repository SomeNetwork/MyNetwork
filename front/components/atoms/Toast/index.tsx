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

import { CardProps } from "components/atoms/Card";

export interface ToastProps {
  text: string;
  variant: "success" | "info" | "warning" | "error";
  onClose?: () => void;
  onClick?: () => void;
  hidden: boolean;
}

const Toast = (props: ToastProps) => {
  const { variant, text, onClick, onClose, hidden } = props;

  const handleClose = (oEvent: React.MouseEvent<HTMLSpanElement>): void => {
    if (onClick) return;
    if (onClose) onClose();
    oEvent.stopPropagation();
    oEvent.preventDefault();
  };
  const handleClick: CardProps["onClick"] = (oEvent) => {
    if (onClick) onClick();
    if (onClose) onClose();
    oEvent?.preventDefault();
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
        onClick={handleClick}
      >
        {iconVariant}
        <Text variant="body2">{text}</Text>
        <span role="button" tabIndex={0} onMouseDown={handleClose}>
          <HighlightOffIcon />
        </span>
      </Card>
    </>
  );
  // return <div className={`${styles[`em-${variant}`]}`}>{text}</div>;
};

Toast.defaultProps = {
  variant: "info",
  hidden: false,
};

export default Toast;
