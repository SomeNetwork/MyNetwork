import React from "react";
import PropTypes from "prop-types";
import { Text } from "components/atoms";
import styles from "./NavTab.module.scss";
import Link from "next/link";

const NavTab = (props) => {
  const { children, label, type, active, to, onClick } = props;
  return (
    <Link href={to}>
      <div
        className={`${styles["nav-tab"]} ${active ? styles["active"] : ""}`}
        onClick={onClick}
      >
        <Text variant="body" className={`${styles["label"]}`}>
          {children || label}
        </Text>
      </div>
    </Link>
  );
};

NavTab.propTypes = {
  children: PropTypes.string,
  label: PropTypes.string,
  active: PropTypes.bool,
  type: PropTypes.oneOf(["link"]),
  to: PropTypes.string,
  onClick: PropTypes.func,
};

NavTab.defaultProps = {
  type: "link",
  active: false,
};

export default NavTab;
