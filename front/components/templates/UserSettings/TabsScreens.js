import React, { useEffect, useState } from "react";
import { confirmEmail, updateUser } from "store/auth/actions";
import styles from "./UserSettings.module.scss";
import {
  configPersonalDataForm,
  configEmailForm,
  configEmailConfirmForm,
  configUsernameForm,
} from "./formsConfig";
import { Auth, Bucket } from "src/api";
import { notificationCreate } from "store/notifications/actions";
import { Button, Card, Form, InputImage, Text } from "components/atoms";
import { useDispatch } from "react-redux";

export const Tab0 = (props) => {
  const { user } = props;

  const dispatch = useDispatch();

  return (
    <div>
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
    </div>
  );
};

export const Tab1 = (props) => {
  const dispatch = useDispatch();
  const { user } = props;
  return (
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
                  Auth.EmailConfirmationCodeResend(user.username).then(() => {
                    dispatch(
                      notificationCreate({
                        variant: "success",
                        text: `Code sended.`,
                      })
                    );
                  })
                }
              />
            </div>
            <Text variant="small">
              To confirm, you need to click on the link in the email sent to
              you. If you can't find the email, we can send it to you again.
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
  );
};

export const Tab2 = (props) => {
  const { user } = props;
  const dispatch = useDispatch();

  return (
    <Card className={styles["block"]}>
      <Form
        {...configUsernameForm}
        // submitButton={{ ...configUsernameForm.submitButton, disabled: true }}
        fields={configUsernameForm.fields.map((field) => ({
          ...field,
          defaultValue: user[field.name],
        }))}
        onSubmit={(data) => {
          console.log("data :>> ", data);
          dispatch(updateUser(data));
        }}
      />
    </Card>
  );
};

export const Tab3 = (props) => {
  const { user } = props;
  const [state, setState] = useState({
    loading: false,
    src: user.avatar ? `${process.env.API_PATH}${user.avatar}` : null,
  });
  const dispatch = useDispatch();

  const handleChange = (file) => {
    setState({ loading: true, file });
    Bucket.localSave(file)
      .then((src) =>
        setState((prevState) => ({ ...prevState, src, loading: false }))
      )
      .catch((err) => setState({ loading: false }));
  };

  useEffect(() => {
    if (user.avatar)
      setState({
        loading: false,
        src: user.avatar ? `${process.env.API_PATH}${user.avatar}` : null,
      });
  }, [user.avatar]);

  return (
    <Card className={styles["block"]}>
      <div className={styles["img-container"]}>
        {state.src ? (
          <img src={state.src} />
        ) : (
          <img src={"/images/emptyImage.jpeg"} />
        )}
      </div>
      <div className={styles["img-inp-container"]}>
        <InputImage name="avatar" file={state.file} onChange={handleChange} />
      </div>
      <Button
        disabled={!state.file}
        fluid
        onClick={() => dispatch(updateUser({ avatar: state.src }))}
      >
        Save avatar
      </Button>
    </Card>
  );
};

export const Tab4 = () => {
  return <div></div>;
};

export const Tab5 = () => {
  return <div></div>;
};
