import { Button, Card, Form, Input, NavTab, Text } from "components/atoms";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "store/auth/actions";
import styles from "./UserSettings.module.scss";
import { tabs, configPersonalDataForm, configEmailForm } from "./formsConfig";
import { Auth } from "src/api";

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
          {tab === 0 && (
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
          )}
          {tab === 1 && (
            <>
              <Form
                {...configEmailForm}
                fields={configEmailForm.fields.map((field) => ({
                  ...field,
                  defaultValue: user[field.name],
                }))}
                onSubmit={(data) => {
                  console.log("data :>> ", data);
                  dispatch(updateUser(data));
                }}
              />
              {!user.confirmed && (
                <div className={styles["email-confirmation"]}>
                  <div className={styles["top"]}>
                    <Text variant="body">Email not confirmed</Text>
                    <Button
                      text="Send code"
                      size="small"
                      onClick={() =>
                        Auth.EmailConfirmationCodeResend(user.username)
                      }
                    />
                  </div>
                  <Text variant="small">
                    To confirm, you need to click on the link in the email sent
                    to you. If you can't find the email, we can send it to you
                    again.
                  </Text>
                </div>
              )}
            </>
          )}
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
