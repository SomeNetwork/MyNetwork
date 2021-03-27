import PropTypes from "prop-types";
import { Form, Card } from "components/atoms";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "store/auth/actions";

const config = {
  title: "Sign In",
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

const Auth = () => {
  const dispatch = useDispatch();
  const handleSubmit = (data) => {
    dispatch(signIn(data));
  };

  const auth = useSelector((state) => state.auth);
  return (
    <>
      <p>username: {auth.username}</p>
      <p>_id: {auth._id}</p>
      <Card>
        <Form {...config} onSubmit={(res) => handleSubmit(res)} />
      </Card>
    </>
  );
};

Auth.propTypes = {};

export default Auth;
