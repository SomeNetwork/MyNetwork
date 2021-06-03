import FullPageLoader from "components/moleculs/FullPageLoader";
import { UserSettings } from "components/templates";
import React from "react";
import { useAppSelector } from "store";

const User = () => {
  // const user = useSelector((state) => state.userPage);
  const { isAuth, user } = useAppSelector((state) => state.auth);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (auth.isAuth) dispatch(loadUserPage({ username: auth.username }));
  // }, [auth]);
  return (
    <>
      {isAuth ? (
        <UserSettings user={user} />
      ) : (
        <FullPageLoader label={"Waiting"} />
      )}
    </>
  );
};

User.propTypes = {};

export default User;
