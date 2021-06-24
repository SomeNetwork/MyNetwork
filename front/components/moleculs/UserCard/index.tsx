import { ArrowForwardIosRounded, Sms } from "@material-ui/icons";
import { Card, IconButton, Image, Text } from "components/atoms";
import React from "react";
import styles from "./UserCard.module.scss";
import Link from "next/link";
import IUser from "src/interfaces/User";

export interface IUserCardProps {
  user: IUser;
  goToChat?: () => void;
}

const UserCard = (props: IUserCardProps) => {
  const { user, goToChat } = props;

  return (
    <Card className={styles["container"]}>
      <div className={styles["avatar"]}>
        <Image
          url={user.avatar}
          variant="avatar"
          className={styles["avatar"]}
        />
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
        {goToChat && <IconButton icon={Sms} onClick={goToChat} />}
        {/* <Sms /> */}
        <Link
          href={{
            pathname: "/users/[username]",
            query: { username: user.username },
          }}
        >
          <ArrowForwardIosRounded />
        </Link>
      </div>
    </Card>
  );
};

UserCard.defaultProps = {
  user: {
    avatar: undefined,
    family_name: "Фамилия",
    name: "Имя",
    username: "usename",
  },
};

export default UserCard;
