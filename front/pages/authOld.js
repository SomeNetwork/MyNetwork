// import { Form } from "components/atoms";
import { Form, Card } from "components/atoms";
import React from "react";

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
  return (
    <>
      <Card>
        <Form
          {...config}
          //   fields={config.fields}
          //   submitButton={config.button}

          onSubmit={(res) => console.log("res :>> ", res)}
        />
      </Card>
    </>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
// export default Auth;
