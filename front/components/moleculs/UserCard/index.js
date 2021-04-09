import PropTypes from "prop-types";
import { ArrowForwardIosRounded, Sms } from "@material-ui/icons";
import { Button, Card, Image, Text } from "components/atoms";
import React from "react";
import styles from "./UserCard.module.scss";

const UserCard = (props) => {
  const { user } = props;
  return (
    <Card className={styles["container"]}>
      <div className={styles["avatar-container"]}>
        <Image url={user.avatar} variant="avatar" />
      </div>

      <div className={styles["baseinfo-container"]}>
        <div className={styles["top"]}>
          <Text variant="body">{user.name}</Text>
          <Text variant="body">{user.family_name}</Text>
          <div className={styles["online"]}>
            <Text variant="small">online</Text>
          </div>
        </div>
        <Text variant="body2">{user.username}</Text>
      </div>
      <div className={styles["actions-container"]}>
        <Sms />
        <ArrowForwardIosRounded />
      </div>
    </Card>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    family_name: PropTypes.string,
    name: PropTypes.string,
    username: PropTypes.string,
  }),
};

export default UserCard;
