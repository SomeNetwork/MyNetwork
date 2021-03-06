import { FormProps } from "components/moleculs/Form";
type FormConfig = Omit<FormProps, "onSubmit">
export const configSignIn: FormConfig = {
  title: "",
  fields: [
    {
      label: "Username",
      name: "username",
      type: "text",
      // defaultValue: "def val",
      rules: [
        (v) =>
          (typeof v === "string" && v.length > 5) ||
          "Must be longer than 5 characters",
        (v) => v !== "" || "Required field",
        (v) =>
          (typeof v === "string" && /^\w*$/.test(v)) ||
          "Username can only contain a-z,A-Z,0-9,_",
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
        (v) =>
          (typeof v === "string" && v.length >= 8) ||
          "Must be longer than 8 characters",
        (v) => v !== "" || "Required field",
        (v) =>
          (typeof v === "string" && /(?=.*[0-9])/.test(v)) ||
          "Must contain number",
        // (v) => /(?=.*[!@#$%^&*])/.test(v) || "Must contain special character",
        (v) =>
          (typeof v === "string" && /(?=.*[a-z])/.test(v)) ||
          "Must contain lowercase latin letter",
        (v) =>
          (typeof v === "string" && /(?=.*[A-Z])/.test(v)) ||
          "Must contain uppercase latin letter",
        (v) =>
          (typeof v === "string" &&
            /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(
              v
            )) ||
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
export const configSignUp: FormConfig = {
  title: "",
  fields: [
    {
      label: "Email",
      name: "email",
      type: "text",
      // defaultValue: "def val",
      rules: [
        (v) => typeof v === "string" && /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/.test(v) || "Invalid format.",
      ],
      required: true,
      fluid: true,
    },
    {
      label: "Username",
      name: "username",
      type: "text",
      rules: [
        (v) => typeof v === "string" && v.length > 5 || "Must be longer than 5 characters",
        (v) => v !== "" || "Required field",
        (v) => typeof v === "string" && /^\w*$/.test(v) || "Username can only contain a-z,A-Z,0-9,_",
      ],
      required: true,
      fluid: true,
    },
    {
      label: "Name",
      name: "name",
      type: "text",
      rules: [
        (v) => typeof v === "string" && v.length > 2 || "Must be longer than 5 characters",
        (v) => v !== "" || "Required field",
        (v) => typeof v === "string" && /^[a-zA-Z??-????-??]*$/.test(v) || "Username can only contain a-z,A-Z,??-??,??-??",
      ],
      required: true,
      fluid: true,
    },
    {
      label: "Family name",
      name: "family_name",
      type: "text",
      rules: [
        (v) => typeof v === "string" && v.length > 2 || "Must be longer than 5 characters",
        (v) => v !== "" || "Required field",
        (v) => typeof v === "string" && /^[a-zA-Z??-????-??]*$/.test(v) || "Username can only contain a-z,A-Z,??-??,??-??",
      ],
      required: true,
      fluid: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      rules: [
        (v) => typeof v === "string" && v.length >= 8 || "Must be longer than 8 characters",
        (v) => v !== "" || "Required field",
        (v) => typeof v === "string" && /(?=.*[0-9])/.test(v) || "Must contain number",
        (v) => typeof v === "string" && /(?=.*[a-z])/.test(v) || "Must contain lowercase latin letter",
        (v) => typeof v === "string" && /(?=.*[A-Z])/.test(v) || "Must contain uppercase latin letter",
        (v) => typeof v === "string" && /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(v) || "Wrong format",
      ],
      required: true,
      fluid: true,
    },
    {
      label: "Repeat password",
      name: "repeat_password",
      type: "password",
      rules: [
        (v) => typeof v === "string" && v.length >= 8 || "Must be longer than 8 characters",
        (v, state) => v == state?.password.value || "Passwords must be the same",
        (v) => v !== "" || "Required field",
        (v) => typeof v === "string" && /(?=.*[0-9])/.test(v) || "Must contain number",
        (v) => typeof v === "string" && /(?=.*[a-z])/.test(v) || "Must contain lowercase latin letter",
        (v) => typeof v === "string" && /(?=.*[A-Z])/.test(v) || "Must contain uppercase latin letter",
        (v) => typeof v === "string" && /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(v) || "Wrong format",
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
export const configEmailConfirm: FormConfig = {
  title: "",
  fields: [
    {
      label: "Username",
      name: "username",
      type: "text",
      rules: [
        (v) => typeof v === "string" && v.length > 5 || "Must be longer than 5 characters",
        (v) => v !== "" || "Required field",
        (v) => typeof v === "string" && /^\w*$/.test(v) || "Username can only contain a-z,A-Z,0-9,_",
      ],
      required: true,
      fluid: true,
    },
    {
      label: "Code",
      name: "code",
      type: "text",
      rules: [
        (v) => typeof v === "string" && v.length > 2 || "Must be longer than 5 characters",
        (v) => v !== "" || "Required field",
        (v) =>
          // /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/.test(
          typeof v === "string" && /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/.test(v) || "Invalid format",
      ],
      required: true,
      fluid: true,
    },
  ],
  submitButton: {
    variant: "primary",
    text: "Confirm accaunt",
    fluid: true,
    animated: true,
  },
};

export const configCodeSend: FormConfig = {
  title: "",
  fields: [
    {
      label: "Username",
      name: "username",
      type: "text",
      rules: [
        (v) => typeof v === "string" && v.length > 5 || "Must be longer than 5 characters",
        (v) => v !== "" || "Required field",
        (v) => typeof v === "string" && /^\w*$/.test(v) || "Username can only contain a-z,A-Z,0-9,_",
      ],
      required: true,
      fluid: true,
    },
  ],
  submitButton: {
    variant: "primary",
    text: "Resend code",
    fluid: true,
    animated: true,
  },
};
