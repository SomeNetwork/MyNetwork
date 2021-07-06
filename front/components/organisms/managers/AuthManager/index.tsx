import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authCheck } from "store/auth/actions";
import { FullPageLoader } from "components/moleculs";
import { useAppDispatch, useAppSelector } from "store";
import { publicUrls, onlyPublicUrls } from "./publicUrls";

export interface AuthManagerProps {
  children: React.ReactChild | React.ReactChild[];
}

const AuthManager = (props: AuthManagerProps) => {
  const { children } = props;
  const [canView, setCanView] = useState(false);
  const router = useRouter();

  const authStore = useAppSelector((store) => store.auth);
  const { isAuth, authChecking } = authStore;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authCheck());
  }, []);
  useEffect(() => {
    setCanView(false);
    if (authChecking === true || authChecking === null) {
      setCanView(false);
      // if (canView !== false) setCanView( false);
    } else if (authChecking === false) {
      if (isAuth === true) {
        // if (router.pathname === "/auth",) router.push("/");
        if (onlyPublicUrls.includes(router.pathname)) router.push("/");
        else setCanView(true);
        //  if (canView !== true) setCanView(true);
      } else if (isAuth === false) {
        // if (
        //   !publicUrls.includes(router.pathname) ||
        //   !/^\/auth((\/)?[\w])*$/.test(router.pathname)
        // )
        //   router.push("/auth");
        if (!publicUrls.includes(router.pathname))
          if (/^\/auth((\/)?[\w])*$/.test(router.pathname)) setCanView(true);
          else router.push("/auth");
        // if (router.pathname !== "/auth") router.push("/auth");
        else setCanView(true);
        // if (canView !== true) setCanView(true);
      }
    }
  }, [canView, isAuth, authChecking, router]);
  return (
    <div>
      {canView ? children : <FullPageLoader label="Authorization check." />}
      {/* {canView ? children : ""} */}
    </div>
  );
};

export default AuthManager;
