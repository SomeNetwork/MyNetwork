import { Card, Text } from "components/atoms";
import PropTypes from "prop-types";
import React from "react";
import styles from "./Tab.module.scss";
import { CardProps } from "components/atoms/Card";

type TabProps = {
  label: string;
  active: false;
  onClick: CardProps["onClick"];
};

const Tab = (props: TabProps) => {
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
  onClick: PropTypes.func.isRequired,
};
Tab.defaultProps = {
  active: true,
  label: "Tab -_-",
};

export default Tab;
