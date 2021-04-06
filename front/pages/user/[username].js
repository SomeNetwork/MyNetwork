import FullPageLoader from "components/moleculs/FullPageLoader";
import { UserPage } from "components/templates";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Api from "src/api";
import { loadUserPage } from "store/userPage/actions";

const User = () => {
  const user = useSelector((state) => state.userPage);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (router.query.username)
      dispatch(loadUserPage({ username: router.query.username }));
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
