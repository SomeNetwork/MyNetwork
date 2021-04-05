import FullPageLoader from "components/moleculs/FullPageLoader";
import { UserPage } from "components/templates";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Api from "src/api";
import { loadUserPage } from "store/userPage/actions";

const User = () => {
  const user = useSelector((state) => state.userPage);
  const dispatch = useDispatch();
  useEffect(() => {
    // Api.DB.User.read({ username: "Fox1209" });
    // debugger;
    dispatch(loadUserPage({ username: "Fox1209" }));
  }, []);
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
