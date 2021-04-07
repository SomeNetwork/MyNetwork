import { Card, Form } from "components/atoms";
import Tabs from "components/moleculs/Tabs";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Auth } from "src/api";
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
import styles from "./AuthForm.module.scss";
import {
  configCodeSend,
  configEmailConfirm,
  configSignIn,
  configSignUp,
} from "./formsConfig";

const AuthForm = () => {
  const state = useSelector((store) => store.authForm);
  const dispatch = useDispatch();
  // const [state, setState] = useState(0);
  return (
    <>
      <div className={styles["multiform-container"]}>
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
              onSubmit={(data) => dispatch(submitSignIn(data))}
            />
          </div>
          <div className={styles["form-container"]} key={2}>
            <Form
              {...configSignUp}
              onSubmit={(data) => dispatch(submitSignUp(data))}
            />
          </div>
          <div className={styles["form-container"]} key={3}>
            <Form
              {...configEmailConfirm}
              onSubmit={(data) => dispatch(submitEmailConfirm(data))}
            />
          </div>
          <div className={styles["form-container"]} key={4}>
            <Form
              {...configCodeSend}
              onSubmit={(data) => dispatch(submitSendCode(data))}
            />
          </div>
        </Tabs>
      </div>
    </>
  );
};

AuthForm.propTypes = {};
export default AuthForm;
