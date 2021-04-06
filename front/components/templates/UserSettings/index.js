import { Button, Card, Form, Input, NavTab, Text } from "components/atoms";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { confirmEmail, updateUser } from "store/auth/actions";
import styles from "./UserSettings.module.scss";
import {
  tabs,
  configPersonalDataForm,
  configEmailForm,
  configEmailConfirmForm,
} from "./formsConfig";
import { Auth } from "src/api";
import { notificationCreate } from "store/notifications/actions";

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

        <div className={styles["settings-right"]}>
          {tab === 0 && (
            <Card className={styles["block"]}>
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
          )}
          {tab === 1 && (
            <>
              <Card className={styles["block"]}>
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
                          Auth.EmailConfirmationCodeResend(user.username).then(
                            () => {
                              dispatch(
                                notificationCreate({
                                  variant: "success",
                                  text: `Code sended.`,
                                })
                              );
                            }
                          )
                        }
                      />
                    </div>
                    <Text variant="small">
                      To confirm, you need to click on the link in the email
                      sent to you. If you can't find the email, we can send it
                      to you again.
                    </Text>
                  </div>
                )}
              </Card>
              {!user.confirmed && (
                <Card className={styles["block"]}>
                  <Form
                    {...configEmailConfirmForm}
                    onSubmit={(data) => {
                      console.log("data :>> ", data);
                      dispatch(confirmEmail(data));
                    }}
                  />
                </Card>
              )}
            </>
          )}
        </div>
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
