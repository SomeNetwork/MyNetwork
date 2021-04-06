export const tabs = [
  "Personal Data",
  "Email",
  "Username",
  "Avatar",
  "Something else",
  "Nothing",
  "Nothing",
];

export const configPersonalDataForm = {
  title: "Personal Data",
  fields: [
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
      defaultValue: "fff",
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
  ],
  submitButton: {
    variant: "primary",
    text: "Save data",
    fluid: true,
    animated: true,
  },
};
export const configEmailForm = {
  title: "Edit email",
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
  ],
  submitButton: {
    variant: "primary",
    text: "Save email",
    fluid: true,
    animated: true,
  },
};
export const configEmailConfirmForm = {
  title: "Confirm Email",
  fields: [
    {
      label: "Code",
      name: "code",
      type: "text",
      rules: [
        (v) => v !== "" || "Required field",
        (v) => v.length > 2 || "Must be longer than 5 characters",
        (v) =>
          /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/.test(
            v
          ) || "Invalid format",
      ],
      required: true,
      fluid: true,
    },
  ],
  submitButton: {
    variant: "primary",
    text: "Confirm email",
    fluid: true,
    animated: true,
  },
};