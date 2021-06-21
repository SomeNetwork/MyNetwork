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
import { Button, Card, Form, Image, InputImage, Text } from "components/atoms";
import { useDispatch } from "react-redux";
import IUser from "src/interfaces/User";
import { FormFieldType } from "components/moleculs/Form";
import { useAppDispatch } from "store";
import { NotificationVariants } from "src/interfaces/Notification";

interface TabProps {
  user: IUser;
}

export const Tab0 = (props: TabProps) => {
  const { user } = props;

  const dispatch = useAppDispatch();

  return (
    <div>
      <Card className={styles["block"]}>
        <Form
          {...configPersonalDataForm}
          fields={configPersonalDataForm.fields.map((field): FormFieldType => {
            return {
              ...field,
              // defaultValue: user[field.name],
              // FIXME: fix me plz
              defaultValue: user[
                field.name as keyof IUser
              ] as FormFieldType["defaultValue"],
            };
          })}
          onSubmit={(data) => {
            console.log("data :>> ", data);
            dispatch(updateUser(data));
            // dispatch(updateUser((data as unknown) as IUser));
          }}
        />
      </Card>
    </div>
  );
};

export const Tab1 = (props: TabProps) => {
  const dispatch = useAppDispatch();
  const { user } = props;
  return (
    <>
      <Card className={styles["block"]}>
        <Form
          {...configEmailForm}
          fields={configEmailForm.fields.map((field) => ({
            ...field,
            // FIXME: fix me plz
            defaultValue: user[
              field.name as keyof IUser
            ] as FormFieldType["defaultValue"],
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
                        variant: NotificationVariants.success,
                        text: `Code sended.`,
                      })
                    );
                  })
                }
              />
            </div>
            <Text variant="small">
              {` To confirm, you need to click on the link in the email sent to
              you. If you can't find the email, we can send it to you again.`}
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
              dispatch(confirmEmail(data as { code: string }));
            }}
          />
        </Card>
      )}
    </>
  );
};

export const Tab2 = (props: TabProps) => {
  const { user } = props;
  const dispatch = useAppDispatch();

  return (
    <Card className={styles["block"]}>
      <Form
        {...configUsernameForm}
        // submitButton={{ ...configUsernameForm.submitButton, disabled: true }}
        fields={configUsernameForm.fields.map((field) => ({
          ...field,
          defaultValue: user[
            field.name as keyof IUser
          ] as FormFieldType["defaultValue"],
        }))}
        onSubmit={(data) => {
          console.log("data :>> ", data);
          dispatch(updateUser(data));
        }}
      />
    </Card>
  );
};

interface ITab3State {
  loading: boolean;
  src: string | null;
  file?: File;
}

export const Tab3 = (props: TabProps) => {
  const { user } = props;
  const [state, setState] = useState<ITab3State>({
    loading: false,
    src: user.avatar ? `${process.env.API_PATH}${user.avatar}` : null,
  });
  const dispatch = useDispatch();

  const handleChange = (file: ITab3State["file"]): void => {
    setState({ loading: true, file, src: null });
    Bucket.localSave(file)
      .then((src) =>
        setState((prevState) => ({
          ...prevState,
          src: src as ITab3State["src"],
          loading: false,
        }))
      )
      .catch(() => setState({ loading: false, src: null }));
  };

  useEffect(() => {
    if (user.avatar)
      setState({
        loading: false,
        src: null,
        // src: user.avatar ? `${process.env.API_PATH}${user.avatar}` : null,
      });
  }, [user.avatar]);

  return (
    <Card className={styles["block"]}>
      <Image
        src={state.src}
        url={state.src ? null : user.avatar}
        variant="avatar"
        className={styles["avatar"]}
      />
      <div className={styles["img-inp-container"]}>
        <InputImage name={"avatar"} file={state.file} onChange={handleChange} />
      </div>
      <Button
        disabled={!state.file}
        fluid
        onClick={() => dispatch(updateUser({ avatar: state.src } as IUser))}
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
