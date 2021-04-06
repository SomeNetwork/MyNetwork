import { Button, Card, Image, Text } from "components/atoms";
import PropTypes from "prop-types";
import React from "react";
import styles from "./UserPage.module.scss";
const UserNotFund = (props) => {
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
UserNotFund.propTypes = {};
UserNotFund.defaultProps = {};
export default UserNotFund;
