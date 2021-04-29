import React, { useState } from "react";
import Tab, { TabProps } from "components/atoms/Tab";
import styles from "./Tabs.module.scss";

export interface TabsProps {
  children: React.ReactChild[];
  tabs: Omit<TabProps, "active">[];
  active: number;
}

const Tabs = (props: TabsProps) => {
  const { tabs, children, active } = props;
  const [value, setValue] = useState(active);

  return (
    <div className={styles["tabs-container"]}>
      <div className={styles["tabs"]}>
        {tabs.map((tab, idx) => (
          <Tab
            key={idx}
            label={tab.label}
            active={(active === undefined ? value : active) === idx}
            onClick={() => {
              tab.onClick && tab.onClick();
              active === undefined && setValue(idx);
            }}
          />
        ))}
      </div>
      <div className={styles["content"]}>
        {children[active === undefined ? value : active]}
      </div>
    </div>
  );
};

Tabs.defaultProps = {
  active: 0,
};

export default Tabs;
