import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { authCheck } from "store/auth/actions";
import { FullPageLoader } from "components/moleculs";

const AuthManager = (props) => {
  const { children } = props;
  const [canView, setCanView] = useState(false);
  const router = useRouter();

  const authStore = useSelector((store) => store.auth);
  const { isAuth, authChecking } = authStore;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheck());
    // setTimeout(() => dispatch(authCheck()), 10000);
  }, []);
  useEffect(() => {
    if (authChecking === true || authChecking === null) {
      if (canView !== false) setCanView(false);
    } else if (authChecking === false) {
      if (isAuth === true) {
        if (router.pathname === "/auth") router.push("/");
        else if (canView !== true) setCanView(true);
      } else if (isAuth === false) {
        // debugger;
        if (!/^\/auth((\/)?[\w])*$/.test(router.pathname)) router.push("/auth");
        // if (router.pathname !== "/auth") router.push("/auth");
        else if (canView !== true) setCanView(true);
      }
    }
  }, [isAuth, authChecking, router.pathname]);
  return (
    <div>
      {canView ? children : <FullPageLoader label="Authorization check." />}
      {/* {canView ? children : ""} */}
    </div>
  );
};
AuthManager.propTypes = {
  children: PropTypes.any,
};
export default AuthManager;
