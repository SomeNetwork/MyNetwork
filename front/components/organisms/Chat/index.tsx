import React from "react";
import { IconButton, Message, Text } from "components/atoms";
import { Grid } from "@material-ui/core";
import styles from "./Chat.module.scss";
import IConversation from "src/interfaces/Conversation";
import IUser from "src/interfaces/User";
import { ArrowBack } from "@material-ui/icons";
import ChatInputForm, { IChatInputFormProps } from "./ChatInputForm";
import { useAppDispatch } from "store";
import { messengerCreateNewMessage } from "store/messenger/actions";

export interface IChatProps {
  conversation: IConversation | null;
  isLoaded: boolean;
  me: IUser;
  onClose: () => void;
}

const Chat = (props: IChatProps) => {
  const { conversation, me, onClose: handleClose } = props;

  const dispatch = useAppDispatch();

  const handleSend: IChatInputFormProps["onSend"] = (content) => {
    console.log(`content`, content);
    if (conversation && me) {
      const data = {
        content,
        authorId: me["_id"],
        conversationId: conversation["_id"],
      };
      dispatch(messengerCreateNewMessage(data));
    }
  };

  return (
    <Grid item container direction="column" xs={8} className={styles["right"]}>
      <Grid
        container
        direction="row"
        className={styles["top-part"]}
        justify={"space-between"}
      >
        {conversation === null ? (
          <Grid item container alignItems={"center"} justify={"center"}>
            <Text>Choose Chat</Text>
          </Grid>
        ) : (
          <>
            <Grid item xs={4} container alignItems={"center"}>
              <IconButton icon={ArrowBack} onClick={handleClose} />
              {/* <ArrowBack onClick={handleClose} /> */}
            </Grid>
            <Grid item xs={4} container alignItems={"center"}>
              tab 2
            </Grid>
            <Grid item xs={4} container alignItems={"center"}>
              tab 3
            </Grid>
          </>
        )}
      </Grid>
      <div className={styles["down-part"]}>
        <Grid
          container
          direction={"column-reverse"}
          className={styles["content"]}
        >
          {conversation?.messages.map((msg) => {
            // console.log(`me._id === msg.authorId`, me._id === msg.authorId);
            return (
              <Message
                key={msg._id}
                message={msg}
                isOwner={me._id === msg.authorId}
              />
            );
          })}
        </Grid>
        {conversation != null && <ChatInputForm onSend={handleSend} />}
      </div>
    </Grid>
  );
};

export default Chat;
