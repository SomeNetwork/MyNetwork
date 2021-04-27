import { Loader, Text } from "components/atoms";
import React from "react";
import styles from "./FullPageLoader.module.scss";
export interface FullPageLoaderProps {
  label: string;
}

const FullPageLoader = (props: FullPageLoaderProps) => {
  const { label } = props;
  return (
    <div className={styles["loader-container"]}>
      <Loader />
      <Text>{label}</Text>
    </div>
  );
};

FullPageLoader.defaultProps = {
  label: "Please waiting.",
};

export default FullPageLoader;
