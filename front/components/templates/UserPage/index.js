import { Button, Card, Image, Text } from "components/atoms";
import UserCard from "components/moleculs/UserCard";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";
import UserNotFund from "./UserNotFund";
import styles from "./UserPage.module.scss";
const UserPage = (props) => {
  const { isOwner, user, isLoaded } = props;
  const router = useRouter();
  // return <UserNotFund />;
  if (!user) return <UserNotFund />;
  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["info-container"]}>
          <Card className={styles["info-left"]}>
            <div className={styles["avatar-container"]}>
              <Image
                // src={"/users/fox1209/images/3.jpg"}
                url={user.avatar}
                // className={styles["ava"]}
                variant="avatar"
              />
            </div>
            {isOwner ? (
              <Button
                onClick={() => router.push("/me/settings")}
                fluid
                size="small"
              >
                Edit
              </Button>
            ) : (
              ""
            )}
          </Card>
          <Card className={styles["info-right"]}>
            <div className={styles["top"]}>
              <div className={styles["username"]}>
                <Text variant="body">{`${user.name} ${user.family_name}`}</Text>
                <Text variant="body2">{user.email}</Text>
              </div>
              <div className={styles["online"]}>
                <Text variant="body2">{"online"}</Text>
                {/* <Text variant="body2">{user.online ? "online" : "offline"}</Text> */}
              </div>
            </div>
            <div className={styles["down"]}>
              <Text>Any other information.</Text>
            </div>
          </Card>
        </div>
      </div>
      <div className={styles["container"]}>
        <UserCard user={user} />
      </div>
    </>
  );
};
UserPage.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    family_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    // online: PropTypes.bool.isRequired,
    avatar: PropTypes.string,
  }),
  isOwner: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};
UserPage.defaultProps = {
  isOwner: false,
  isLoaded: false,
  user: {},
};
export default UserPage;
