import { Card, Form, Input, NavTab, Text } from "components/atoms";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "store/auth/actions";
import styles from "./UserSettings.module.scss";

const tabs = [
  "Personal Data",
  "Email",
  "Username",
  "Avatar",
  "Something else",
  "Nothing",
  "Nothing",
];

const configPersonalDataForm = {
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

const UserSettings = (props) => {
  const { user } = props;
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();

  return (
    <div className={styles["container"]}>
      <div className={styles["settings-container"]}>
        <Card className={styles["settings-left"]}>
          {tabs.map((label, idx) => (
            <NavTab
              key={idx}
              type="tab"
              variant="left"
              onClick={() => setTab(idx)}
              active={tab === idx}
            >
              {label}
            </NavTab>
          ))}
          {/* <Text className={styles["paragraph"]}>Accaunt</Text> */}
        </Card>
        <Card className={styles["settings-right"]}>
          <Form
            {...configPersonalDataForm}
            fields={configPersonalDataForm.fields.map((field) => ({
              ...field,
              defaultValue: user[field.name],
            }))}
            onSubmit={(data) => {
              console.log("data :>> ", data);
              dispatch(updateUser(data));
            }}
          />
        </Card>
      </div>
    </div>
  );
};
UserSettings.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    family_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    // online: PropTypes.bool.isRequired,
    avatar: PropTypes.string,
  }),
};
UserSettings.defaultProps = {
  // isOwner: false,
  // isLoaded: false,
  user: {},
};
export default UserSettings;
