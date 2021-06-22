import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import styles from "./Chat.module.scss";
import IUser from "src/interfaces/User";
import {
  IconButton,
  Image,
  InputImage,
  Input,
  Text,
  Button,
} from "components/atoms";
import { ArrowBack } from "@material-ui/icons";
import { useAppDispatch, useAppSelector } from "store";
import {
  avatarChange,
  memberChange,
  nameChange,
  submitForm,
} from "store/chatForm/actions";
import { DB } from "@api";
import { MessengerScreens } from "store/messenger/type";

export interface IChatCreateFormProps {
  me: IUser;
  onClose: () => void;
}

const ChatCreateForm = (props: IChatCreateFormProps) => {
  const { onClose } = props;
  const state = useAppSelector((state) => state.chatForm);
  const formType = useAppSelector((state) => state.messenger.screen);
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    let flag = true;
    DB.User.list({}).then((res) => res && flag && setUsers(res.users));
    return () => {
      flag = false;
    };
  }, []);
  const dispatch = useAppDispatch();
  return (
    <Grid item container direction="column" xs={8} className={styles["right"]}>
      <Grid
        container
        direction="row"
        className={styles["top-part"]}
        justify={"space-between"}
      >
        <Grid item container alignItems={"center"}>
          <Grid item xs={1}>
            <div className={styles["back"]}>
              <IconButton icon={ArrowBack} onClick={onClose} />
            </div>
          </Grid>
          <Grid item container xs={10} justify={"center"}>
            <Grid item>
              <Text>Create new Chat</Text>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className={styles["down-part"]}>
        <div className={styles["create-form"]}>
          <>
            <Image
              url={state.avatar.src ? null : state.avatar.url}
              src={state.avatar.src}
              variant="avatar"
              className={styles["avatar"]}
            />
            <div className={styles["img-inp-container"]}>
              <InputImage
                name={"avatar"}
                onChange={(data) => dispatch(avatarChange(data))}
              />
            </div>
          </>
          <Input
            value={state.name.value}
            error={state.name.error}
            onChange={(value) => dispatch(nameChange(value as string))}
            label="Name"
            name="name"
            required
            fluid
          />
          {"//FIXME: delete em plz "}
          <Autocomplete
            multiple
            id="tags-standard"
            options={users}
            getOptionLabel={(option) => option.username}
            value={state.members}
            // defaultValue={[]}
            // onChange={(oEvent, newValue) => console.log(`oEvent`, newValue)}
            onChange={(oEvent, newValue) => dispatch(memberChange(newValue))}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                size="medium"
                fullWidth
              />
            )}
          />
          <Button fluid onClick={() => dispatch(submitForm())}>
            {formType === MessengerScreens.fromCreate ? "Create" : "Update"}
          </Button>
        </div>
      </div>
    </Grid>
  );
};

export default ChatCreateForm;
