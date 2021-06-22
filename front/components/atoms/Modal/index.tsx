import React from "react";
import styles from "./Modal.module.scss";

const positionContainerStyles = [
  "left",
  "right",
  "bottom",
  "top",
  "centerX",
  "centerY",
] as const;

export interface IModalProps {
  children: React.ReactNode[];
  position: { [key in typeof positionContainerStyles[number]]: boolean };
}

const Modal = (props: IModalProps) => {
  const { children } = props;
  const parseStyles = () => {
    const { position } = props;
    return Object.entries(position)
      .map(([key, val]) => (val ? styles[key] : ""))
      .join(" ");
  };

  return (
    <>
      <div className={styles["background"]} />
      <div className={styles["root"] + " " + parseStyles()}>{children}</div>
    </>
  );
};
Modal.defaultProps = {};
export default Modal;
