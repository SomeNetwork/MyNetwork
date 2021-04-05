import { Button, Card, Image, Text } from "components/atoms";
import React from "react";
import styles from "./UserPage.module.scss";
const UserPage = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["info-container"]}>
        <Card className={styles["info-left"]}>
          <Image
            src={"/users/fox1209/images/3.jpg"}
            className={styles["ava"]}
          />
          <Button onClick={() => console.log("to settings")} fluid>
            Edit
          </Button>
        </Card>
        <Card className={styles["info-right"]}>
          <div className={styles["top"]}>
            <div className={styles["username"]}>
              <Text variant="body">Ivan Petrov</Text>
              <Text variant="body2">ivan@gamil.com</Text>
            </div>
            <div className={styles["online"]}>
              <Text variant="body2">online</Text>
            </div>
          </div>
          <div className={styles["down"]}>
            <Text>Any other information.</Text>
          </div>
        </Card>
      </div>
    </div>
  );
};
UserPage.propTypes = {};
UserPage.defaultProps = {};
export default UserPage;
