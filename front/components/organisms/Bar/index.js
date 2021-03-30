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
      <Text variant="title" className={styles["title"]}>
        Some Network
      </Text>
      <div className={styles["navs"]}>
        {isAuth ? (
          <>
            <NavTab to={"/"} active={router.pathname === "/"}>
              MainPage
            </NavTab>
            <NavTab to={"/forms"} active={router.pathname === "/forms"}>
              forms
            </NavTab>
            <NavTab to={"/inputs"} active={router.pathname === "/inputs"}>
              inputs
            </NavTab>
          </>
        ) : (
          <>
            <NavTab to={"/auth"} active={router.pathname === "/auth"}>
              Auth
            </NavTab>
          </>
        )}

        {/* {navList.map(({ to, label }, idx) => (
          <NavTab key={idx} to={to} active={to === router.pathname}>
            {label}
          </NavTab>
        ))} */}
      </div>
      <div className={styles["auth"]}>
        {isAuth ? (
          <>
            <Text className={styles["username"]}>{username}</Text>
            <NavTab to="/auth" onClick={handleSignOut}>
              SignOut
            </NavTab>
          </>
        ) : (
          <>
            <NavTab to="/auth" active={router.pathname === "/auth"}>
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
