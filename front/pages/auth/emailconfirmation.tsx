import { FullPageLoader } from "components/moleculs";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Auth } from "src/api";
import { NotificationVariants } from "src/interfaces/Notification";
import { loadUser } from "store/auth/actions";
import { notificationCreate } from "store/notifications/actions";

const EmailConfirmation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  console.log("router :>> ", router);
  useEffect(() => {
    const { username, code } = router.query;
    if (username && code) {
      Auth.EmailConfirm(username as string, code as string)
        .then(() => {
          dispatch(
            notificationCreate({
              variant: NotificationVariants.success,
              text: `Email successful confirmed.`,
            })
          );
          dispatch(loadUser());
          router.push("/");
        })
        .catch((error) => {
          dispatch(
            notificationCreate({
              variant: NotificationVariants.error,
              text: (error as Error).message,
            })
          );
        })
        .finally(() => router.push("/auth"));
    }
  }, [router]);
  return (
    <>
      <FullPageLoader label="Waiting. Checking the confirmation code." />
    </>
  );
};

EmailConfirmation.propTypes = {};

export default EmailConfirmation;
