import FullPageLoader from "components/moleculs/FullPageLoader";
import { UserPage } from "components/templates";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { loadUserPage } from "store/userPage/actions";

const User = () => {
  const user = useAppSelector((state) => state.userPage);
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (router.query.username)
      dispatch(loadUserPage({ username: router.query.username as string }));
  }, [router]);
  return (
    <>
      {user.isLoaded ? (
        <UserPage {...user} />
      ) : (
        <FullPageLoader label={"Waiting"} />
      )}
    </>
  );
};

User.propTypes = {};

export default User;
