import PropTypes from "prop-types";
import React from "react";
import styles from "./Card.module.scss";

const Card = (props) => {
  const { children, className, onClick } = props;
  return (
    <div className={`${styles["card"]} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.any,
  className: PropTypes.any,
  onClick: PropTypes.func,
};

export default Card;
