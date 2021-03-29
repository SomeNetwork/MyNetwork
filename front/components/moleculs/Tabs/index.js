import PropTypes from "prop-types";
import React, { useState } from "react";
import Tab from "../../atoms/Tab";
import styles from "./Tabs.module.scss";
const Tabs = (props) => {
  const { tabs, children } = props;
  const [value, setValue] = useState(0);

  return (
    <div className={styles["tabs-container"]}>
      <div className={styles["tabs"]}>
        {tabs.map((tab, idx) => (
          <Tab
            key={idx}
            label={tab.label}
            active={value === idx}
            onClick={() => setValue(idx)}
          />
        ))}
      </div>
      <div className={styles["content"]}>{children[value]}</div>
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.any,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired, // id: PropTypes.number.isRequired,
    })
  ),
};
Tabs.defaultProps = {
  value: 0,
};

export default Tabs;
