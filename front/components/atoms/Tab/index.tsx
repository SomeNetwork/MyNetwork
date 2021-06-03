import { Card, Text } from "components/atoms";
import React from "react";
import styles from "./Tab.module.scss";
import { CardProps } from "components/atoms/Card";

export interface TabProps {
  label: string;
  active: boolean;
  onClick: CardProps["onClick"];
}

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

Tab.defaultProps = {
  active: true,
  label: "Tab -_-",
};

export default Tab;
