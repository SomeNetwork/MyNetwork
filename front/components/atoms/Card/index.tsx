import React from "react";
import styles from "./Card.module.scss";

export type CardProps = {
  children: React.ReactNode;
  className: string;
  onClick?: (oEvent: React.MouseEvent<HTMLDivElement>) => void;
};

const Card = (props: CardProps) => {
  const { children, className, onClick } = props;
  return (
    <div
      className={`${styles["card"]} ${className}`}
      role={onClick ? "button" : "div"}
      // onClick={onClick}
      onMouseDown={onClick}
    >
      {children}
    </div>
  );
};

// Card.propTypes = {
//   children: PropTypes.any,
//   className: PropTypes.any,
//   onClick: PropTypes.func,
// };

export default Card;
