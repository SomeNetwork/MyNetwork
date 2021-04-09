import { FullPageLoader } from "components/moleculs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Auth } from "src/api";
import { loadUser } from "store/auth/actions";
import { notificationCreate } from "store/notifications/actions";

const EmailConfirmation = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  console.log("router :>> ", router);
  useEffect(() => {
    if (router.query.username && router.query.code) {
      Auth.EmailConfirm(router.query.username, router.query.code)
        .then(() => {
          dispatch(
            notificationCreate({
              variant: "success",
              text: `Email successful confirmed.`,
            })
          );
          dispatch(loadUser());
          router.push("/");
        })
        .catch((error) => {
          dispatch(
            notificationCreate({
              variant: "error",
              text: error.message,
            })
          );
        })
        .finally(() => router.push("/auth"));
    }
  }, [router]);
  return (
    <>
      {loading ? (
        <FullPageLoader label="Waiting. Checking the confirmation code." />
      ) : (
        "gg"
      )}
    </>
  );
};

EmailConfirmation.propTypes = {};

export default EmailConfirmation;
