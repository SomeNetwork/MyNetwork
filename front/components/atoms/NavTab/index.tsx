import React from "react";
import { Text } from "components/atoms";
import styles from "./NavTab.module.scss";
import Link from "next/link";

export interface NavTabProps {
  // children: string | string[] | React.ReactChildren;

  children?: React.ReactNode | string;
  label?: string;
  active: boolean;
  type: "link" | "tab";
  to: string;
  onClick: () => void;
  variant: "left" | "right" | "bottom";
}

const NavTab = (props: NavTabProps) => {
  const { children, label, type, active, to, onClick, variant } = props;

  const tab = (
    <div
      role="button"
      tabIndex={0}
      className={`${styles["nav-tab"]} ${active ? styles["active"] : ""} ${
        variant ? styles[variant] : ""
      }`}
      onMouseDown={onClick}
    >
      {typeof label === "string" ? (
        <Text variant="body" className={`${styles["label"]}`}>
          {label}
        </Text>
      ) : typeof children === "string" ? (
        <Text variant="body" className={`${styles["label"]}`}>
          {children}
        </Text>
      ) : (
        children
      )}
    </div>
  );
  if (type === "link") return <Link href={to}>{tab}</Link>;
  return tab;
};

NavTab.defaultProps = {
  type: "link",
  active: false,
  variant: "bottom",
};

export default NavTab;
