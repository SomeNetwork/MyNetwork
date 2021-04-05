import { Card, Form } from "components/atoms";
import Tabs from "components/moleculs/Tabs";
import React from "react";
import { useDispatch } from "react-redux";
import { signIn, signUp } from "store/auth/actions";
import styles from "./AuthForm.module.scss";

const configSignIn = {
  title: "",
  fields: [
    {
      label: "Username",
      name: "username",
      type: "text",
      // defaultValue: "def val",
      rules: [
        (v) => v.length > 5 || "Must be longer than 5 characters",
        (v) => v !== "" || "Required field",
        (v) => /^\w*$/.test(v) || "Username can only contain a-z,A-Z,0-9,_",
      ],
      required: true,
      fluid: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      // defaultValue: "def val",
      rules: [
        (v) => v.length >= 8 || "Must be longer than 8 characters",
        (v) => v !== "" || "Required field",
        (v) => /(?=.*[0-9])/.test(v) || "Must contain number",
        // (v) => /(?=.*[!@#$%^&*])/.test(v) || "Must contain special character",
        (v) => /(?=.*[a-z])/.test(v) || "Must contain lowercase latin letter",
        (v) => /(?=.*[A-Z])/.test(v) || "Must contain uppercase latin letter",
        (v) =>
          /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(v) ||
          "Wrong format",
      ],
      required: true,
      fluid: true,
    },
  ],
  submitButton: {
    variant: "primary",
    text: "SignIn",
    fluid: true,
  },
};
const configSignUp = {
  title: "",
  fields: [
    {
      label: "Email",
      name: "email",
      type: "text",
      // defaultValue: "def val",
      rules: [
        (v) =>
          /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/.test(
            v
          ) || "Invalid format.",
      ],
      required: true,
      fluid: true,
    },
    {
      label: "Username",
      name: "username",
      type: "text",
      rules: [
        (v) => v.length > 5 || "Must be longer than 5 characters",
        (v) => v !== "" || "Required field",
        (v) => /^\w*$/.test(v) || "Username can only contain a-z,A-Z,0-9,_",
      ],
      required: true,
      fluid: true,
    },
    {
      label: "Name",
      name: "name",
      type: "text",
      rules: [
        (v) => v.length > 2 || "Must be longer than 5 characters",
        (v) => v !== "" || "Required field",
        (v) =>
          /^[a-zA-Zа-яА-Я]*$/.test(v) ||
          "Username can only contain a-z,A-Z,А-Я,я-я",
      ],
      required: true,
      fluid: true,
    },
    {
      label: "Family name",
      name: "family_name",
      type: "text",
      rules: [
        (v) => v.length > 2 || "Must be longer than 5 characters",
        (v) => v !== "" || "Required field",
        (v) =>
          /^[a-zA-Zа-яА-Я]*$/.test(v) ||
          "Username can only contain a-z,A-Z,А-Я,я-я",
      ],
      required: true,
      fluid: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      rules: [
        (v) => v.length >= 8 || "Must be longer than 8 characters",
        (v) => v !== "" || "Required field",
        (v) => /(?=.*[0-9])/.test(v) || "Must contain number",
        (v) => /(?=.*[a-z])/.test(v) || "Must contain lowercase latin letter",
        (v) => /(?=.*[A-Z])/.test(v) || "Must contain uppercase latin letter",
        (v) =>
          /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(v) ||
          "Wrong format",
      ],
      required: true,
      fluid: true,
    },
    {
      label: "Repeat password",
      name: "repeat_password",
      type: "password",
      rules: [
        (v) => v.length >= 8 || "Must be longer than 8 characters",
        (v, state) => v == state.password.value || "Passwords must be the same",
        (v) => v !== "" || "Required field",
        (v) => /(?=.*[0-9])/.test(v) || "Must contain number",
        (v) => /(?=.*[a-z])/.test(v) || "Must contain lowercase latin letter",
        (v) => /(?=.*[A-Z])/.test(v) || "Must contain uppercase latin letter",
        (v) =>
          /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(v) ||
          "Wrong format",
      ],
      required: true,
      fluid: true,
    },
  ],
  submitButton: {
    variant: "primary",
    text: "SignUp",
    fluid: true,
    animated: true,
  },
};

const AuthForm = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles["multiform-container"]}>
        <Tabs tabs={[{ label: "SignIn" }, { label: "SignUp" }]}>
          <div className={styles["form-container"]} key={1}>
            <Form
              {...configSignIn}
              onSubmit={(data) => dispatch(signIn(data))}
            />
          </div>
          <div className={styles["form-container"]} key={2}>
            <Form
              {...configSignUp}
              onSubmit={(data) => dispatch(signUp(data))}
            />
          </div>
        </Tabs>
      </div>
    </>
  );
};

AuthForm.propTypes = {};
export default AuthForm;
