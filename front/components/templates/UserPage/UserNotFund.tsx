import { Card, Text } from "components/atoms";
import React from "react";
import styles from "./UserPage.module.scss";

const UserNotFund = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["info-container"]}>
        <Card className={styles["not-found"]}>
          <Text>User not found!</Text>
        </Card>
      </div>
    </div>
  );
};

export default UserNotFund;
