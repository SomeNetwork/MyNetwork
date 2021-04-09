import React from "react";
import PropTypes from "prop-types";
import { Text } from "components/atoms";
import styles from "./NavTab.module.scss";
import Link from "next/link";

const NavTab = (props) => {
  const { children, label, type, active, to, onClick, variant } = props;

  const tab = (
    <div
      className={`${styles["nav-tab"]} ${active ? styles["active"] : ""} ${
        variant ? styles[variant] : ""
      }`}
      onClick={onClick}
    >
      {React.isValidElement(children) ? (
        children
      ) : (
        <Text variant="body" className={`${styles["label"]}`}>
          {children || label}
        </Text>
      )}
    </div>
  );
  if (type === "link") return <Link href={to}>{tab}</Link>;
  return tab;
};

NavTab.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  label: PropTypes.string,
  active: PropTypes.bool,
  type: PropTypes.oneOf(["link", "tab"]),
  to: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["left", "right", "bottom"]),
};

NavTab.defaultProps = {
  type: "link",
  active: false,
  variant: "bottom",
};

export default NavTab;
