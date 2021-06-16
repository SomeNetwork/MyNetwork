import React from "react";
import { useRouter } from "next/router";

import { Text, NavTab, Image } from "components/atoms";
import styles from "./Bar.module.scss";
import { signOut } from "store/auth/actions";
import { useAppDispatch, useAppSelector } from "store";
import { Grid } from "@material-ui/core";

const Bar = () => {
  const router = useRouter();
  const authUser = useAppSelector((store) => store.auth);
  const {
    isAuth,
    user: { username },
  } = authUser;
  const dispatch = useAppDispatch();
  const handleSignOut = () => dispatch(signOut({ username }));
  return (
    <div className={styles["bar-top"]}>
      {/* <Text variant="title" className={styles["title"]}>
        Some Network
      </Text> */}
      <NavTab to={"/"}>
        <div className={styles["title"]}>
          <Text variant="title" className={styles["title-text"]}>
            Some
          </Text>
          <Image src="/logo-128.png" className={styles["title-icon"]}></Image>
          <Text variant="title" className={styles["title-text"]}>
            net
          </Text>
        </div>
      </NavTab>
      {/* <NavTab to={"/"}>
        <div className={styles["title"]}>
          <Image src="/logo-128.png" className={styles["title-icon"]}></Image>
          <Text variant="title" className={styles["title-text"]}>
            Some Net
          </Text>
        </div>
      </NavTab> */}
      <div className={styles["navs"]}>
        {isAuth ? (
          <>
            <NavTab to={"/users"} active={router.asPath === "/users"}>
              Users
            </NavTab>
            <NavTab to={"/chats"} active={router.asPath === "/chats"}>
              Chats
            </NavTab>
          </>
        ) : (
          <>
            <NavTab to={"/auth"} active={router.asPath === "/auth"}>
              Auth
            </NavTab>
          </>
        )}
      </div>
      <div className={styles["auth"]}>
        {isAuth ? (
          <>
            <NavTab
              to={`/users/${username}`}
              active={router.asPath === `/users/${username}`}
            >
              {username}
            </NavTab>
            <NavTab
              to={"/me/settings"}
              active={router.asPath === "/me/settings"}
            >
              Settings
            </NavTab>
            <NavTab type="tab" onClick={handleSignOut} to={"/auth"}>
              SignOut
            </NavTab>
          </>
        ) : (
          <>
            <NavTab to="/auth" active={router.asPath === "/auth"}>
              SignIn/SignUp
            </NavTab>
          </>
        )}
      </div>
    </div>
  );
};

export const WithBar = (props: {
  children: React.ReactChild | React.ReactChild[];
}) => {
  const { children } = props;
  return (
    <>
      <Bar />
      <Grid container justify={"center"}>
        <Grid
          item
          xs={12}
          sm={12}
          md={10}
          lg={8}
          xl={6}
          className={styles["content-conteiner"]}
        >
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default Bar;
