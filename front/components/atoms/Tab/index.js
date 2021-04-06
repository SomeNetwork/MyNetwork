import { Card, Text } from "components/atoms";
import PropTypes from "prop-types";
import React from "react";
import styles from "./Tab.module.scss";

const Tab = (props) => {
  const { label, active, onClick } = props;
  return (
    <Card
      className={`${styles["tab"]} ${active ? styles["active"] : ""}`}
      onClick={onClick}
    >
      <Text>{label}</Text>
    </Card>
  );
};

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  // id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
Tab.defaultProps = {
  active: true,
  label: "Tab -_-",
};

export default Tab;
