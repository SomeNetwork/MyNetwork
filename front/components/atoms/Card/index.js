import React from "react";
import styles from "./Card.module.scss";

const Card = (props) => {
  const { children } = props;
  return <div className={styles["card"]}>{children}</div>;
};

Card.propTypes = {};

export default Card;
