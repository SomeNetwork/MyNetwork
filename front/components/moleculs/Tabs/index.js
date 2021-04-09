import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Tab from "../../atoms/Tab";
import styles from "./Tabs.module.scss";
const Tabs = (props) => {
  const { tabs, children, active } = props;
  const [value, setValue] = useState(active === undefined ? 0 : active);

  // useEffect(() => {
  //   ;
  //   setValue(active);
  // }, [active]);

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

Tabs.propTypes = {
  children: PropTypes.any,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired, // id: PropTypes.number.isRequired,
      onClick: PropTypes.func,
    })
  ),
  active: PropTypes.number,
};
Tabs.defaultProps = {
  value: 0,
};

export default Tabs;
