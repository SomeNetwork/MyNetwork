import React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Text, NavTab } from "components/atoms";
import styles from "./Bar.module.scss";
import { signOut } from "store/auth/actions";


const navList = [
  {
    to: "/",
    label: "Main page",
  },
  // {
  //   to: "/auth",
  //   label: "Auth",
  // },
];

const Bar = () => {
  const router = useRouter();
  const authUser = useSelector((store) => store.auth);
  const { isAuth, username } = authUser;
  const dispatch = useDispatch();
  const handleSignOut = () => dispatch(signOut({ username }));
  return (
    <div className={styles["bar-top"]}>
      {/* <Text variant="title" className={styles["title"]}>
        Some Network
      </Text> */}
      <NavTab to={"/"}>
        <Text variant="title" className={styles["title"]}>
          Some Network
        </Text>
      </NavTab>
      <div className={styles["navs"]}>
        {isAuth ? (
          <>
            <NavTab to={"/users"} active={router.asPath === "/users"}>
              Users
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
            <NavTab to="/auth" onClick={handleSignOut}>
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

Bar.propTypes = {};
export default Bar;
