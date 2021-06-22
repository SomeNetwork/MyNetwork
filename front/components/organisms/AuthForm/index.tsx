import { Grid } from "@material-ui/core";
import { Form } from "components/atoms";
import Tabs from "components/moleculs/Tabs";
import React from "react";
import { useAppDispatch, useAppSelector } from "store";
// import { signIn, signUp } from "store/auth/actions";
import {
  gotoCodeSend,
  gotoEmailConfirm,
  gotoSignIn,
  gotoSignUp,
  submitEmailConfirm,
  submitSendCode,
  submitSignIn,
  submitSignUp,
} from "store/authForm/actions";
import {
  IActionSubmitEmailConfirm,
  IActionSubmitSendCode,
  IActionSubmitSignIn,
} from "store/authForm/types";
import styles from "./AuthForm.module.scss";
import {
  configCodeSend,
  configEmailConfirm,
  configSignIn,
  configSignUp,
} from "./formsConfig";

const AuthForm = () => {
  const state = useAppSelector((store) => store.authForm);
  // const state = useSelector((store) => store.authForm);
  const dispatch = useAppDispatch();
  // const [state, setState] = useState(0);
  return (
    <>
      <Grid
        item
        container
        className={styles["multiform-container"]}
        justify={"center"}
        alignItems={"center"}
      >
        <Tabs
          tabs={[
            { label: "SignIn", onClick: () => dispatch(gotoSignIn()) },
            { label: "SignUp", onClick: () => dispatch(gotoSignUp()) },
            { label: "Confirm", onClick: () => dispatch(gotoEmailConfirm()) },
            { label: "Code", onClick: () => dispatch(gotoCodeSend()) },
          ]}
          active={state.active}
        >
          <div className={styles["form-container"]} key={1}>
            <Form
              {...configSignIn}
              onSubmit={(data) =>
                // FIXME: fix type
                dispatch(submitSignIn(data as IActionSubmitSignIn["payload"]))
              }
            />
          </div>
          <div className={styles["form-container"]} key={2}>
            <Form
              {...configSignUp}
              onSubmit={(data) =>
                dispatch(
                  submitSignUp(
                    // FIXME: fix type
                    data
                    // (data as unknown) as IActionSubmitSignUp["payload"]
                  )
                )
              }
            />
          </div>
          <div className={styles["form-container"]} key={3}>
            <Form
              {...configEmailConfirm}
              onSubmit={(data) =>
                dispatch(
                  submitEmailConfirm(
                    // FIXME: fix type
                    data as IActionSubmitEmailConfirm["payload"]
                  )
                )
              }
            />
          </div>
          <div className={styles["form-container"]} key={4}>
            <Form
              {...configCodeSend}
              onSubmit={(data) =>
                dispatch(
                  // FIXME: fix type
                  submitSendCode(data as IActionSubmitSendCode["payload"])
                )
              }
            />
          </div>
        </Tabs>
      </Grid>
    </>
  );
};

export default AuthForm;
