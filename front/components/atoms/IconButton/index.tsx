import React from "react";
import styles from "./IconButton.module.scss";

const style = {
  "&:hover": {
    cursor: "pointer",
  },
};

export interface IconButtonProps {
  // variant?: "primary" | "secondary" | "success" | "warning" | "error";
  // children?: string | React.ReactNode;
  // // children: any,
  // text?: string;
  // onClick: () => void;
  // fluid?: boolean;
  // animated?: boolean;
  // size?: "small" | "normal" | "huge";
  // disabled?: boolean;

  // FIXME: to Icon type
  icon: any;
  onClick: () => void;
  fontSize?: "default" | "inherit" | "large" | "small";
  disabled?: boolean;
}

const IconButton = (props: IconButtonProps) => {
  const { icon: Icon, fontSize, disabled, onClick: handleClick } = props;
  return (
    <div className={styles["icon-btn"]}>
      <Icon
        fontSize={fontSize}
        disabled={disabled}
        // style={style}
        onClick={handleClick}
        // component="div"
      />
    </div>
  );
};

IconButton.defaultProps = {
  fontSize: "default",
  disabled: false,
};

export default IconButton;
