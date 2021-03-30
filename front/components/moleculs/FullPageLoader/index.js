import PropTypes from "prop-types";
import { Loader, Text } from "components/atoms";
import React from "react";
import styles from "./FullPageLoader.module.scss";

const FullPageLoader = (props) => {
  const { label } = props;
  return (
    <div className={styles["loader-container"]}>
      <Loader />
      <Text>{label}</Text>
    </div>
  );
};

FullPageLoader.propTypes = {
  label: PropTypes.string,
};
FullPageLoader.defaultProps = {
  label: "Please waiting.",
};

export default FullPageLoader;
