import React from "react";
import styles from "./Card.module.scss";

export interface CardProps {
  children: React.ReactNode;
  className: string;
  onClick?: (oEvent?: React.MouseEvent<HTMLDivElement>) => void;
  style?: any;
}

const Card = (props: CardProps) => {
  const { children, className, onClick, style } = props;
  return (
    <div
      className={`${styles["card"]} ${className}`}
      role={onClick ? "button" : "div"}
      // onClick={onClick}
      onMouseDown={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;
