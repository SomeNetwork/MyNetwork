import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, IconButton, Image, Message, Text } from "components/atoms";
import { Grid } from "@material-ui/core";
import styles from "./Chat.module.scss";
import IConversation, { ConversationTypes } from "src/interfaces/Conversation";
import IUser from "src/interfaces/User";
import { ArrowBack, ExpandMore } from "@material-ui/icons";
import ChatInputForm, { IChatInputFormProps } from "./ChatInputForm";
import { useAppDispatch } from "store";
import {
  messengerCreateNewMessage,
  messengerSetScreen,
} from "store/messenger/actions";
import { PopupMenu } from "components/moleculs";
import { useRouter } from "next/router";
import { MessengerScreens } from "store/messenger/type";
import { MessageType } from "src/interfaces/Message";

export interface IChatProps {
  conversation: IConversation | null;
  isLoaded: boolean;
  me: IUser;
  onClose: () => void;
}

const Chat = (props: IChatProps) => {
  const { conversation, me, onClose: handleClose } = props;

  const [menuIsOpen, setMenuOpen] = useState<boolean>(false);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const menuEl = useRef<null | HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView(/* { behavior: "smooth" } */);
  };

  useEffect(() => {
    if (conversation?.messages?.length) scrollToBottom();
    if (conversation != null && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.value = "";
    }
  }, [conversation]);

  const handleSend: IChatInputFormProps["onSend"] = (content) => {
    if (conversation && me) {
      const data = {
        content,
        authorId: me["_id"],
        type: MessageType.text,
        conversationId: conversation["_id"],
      };
      dispatch(messengerCreateNewMessage(data));
    }
  };

  const handleOpenSettings = useCallback(() => {
    dispatch(messengerSetScreen(MessengerScreens.formUpdate));
  }, [dispatch]);

  const groupMenuTabs = [
    {
      label: "settings",
      onClick: handleOpenSettings,
    },
    {
      label: "something 2 ...",
      onClick: () => {
        console.log("clicked 2");
      },
    },
  ];
  const privateMenuTabs = [
    {
      label: "user page",
      onClick: () => {
        if (conversation?.interlocutor?.username)
          router.push({
            pathname: "/users/[username]",
            query: { username: conversation?.interlocutor?.username },
          });
      },
    },
    {
      label: "something 2 ...",
      onClick: () => {
        console.log("clicked 2");
      },
    },
  ];

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
            <Grid item xs={6} container alignItems={"center"}>
              <div className={styles["back"]}>
                <IconButton icon={ArrowBack} onClick={handleClose} />
              </div>
              {/* <ArrowBack onClick={handleClose} /> */}
              <div
                ref={menuEl}
                className={styles["info"]}
                onClick={() => setMenuOpen(true)}
                onKeyPress={() => setMenuOpen(true)}
                role="button"
                tabIndex={0}
              >
                <Image
                  url={conversation.avatar}
                  variant="avatar"
                  className={styles["avatar"]}
                />
                <div className={styles["name"]}>{conversation.name}</div>
                <IconButton
                  icon={ExpandMore}
                  onClick={() => setMenuOpen(true)}
                />
              </div>
              <PopupMenu
                isOpen={menuIsOpen}
                tabs={
                  conversation.type === ConversationTypes.group
                    ? groupMenuTabs
                    : privateMenuTabs
                }
                anchorEl={menuEl.current}
                close={() => {
                  setMenuOpen(false);
                }}
              />
            </Grid>
          </>
        )}
      </Grid>
      <div className={styles["down-part"]}>
        <div className={styles["messages-container-parent"]}>
          {conversation ? (
            conversation.messages.length > 0 ? (
              <div className={styles["messages-container-child"]}>
                <Grid
                  container
                  direction={"column-reverse"}
                  className={styles["content"]}
                >
                  <div ref={messagesEndRef} />
                  {conversation?.messages.map((msg) => (
                    <Message
                      key={msg._id}
                      message={msg}
                      isOwner={me._id === msg.author?._id}
                    />
                  ))}
                </Grid>
              </div>
            ) : (
              <Card className={styles["info-message"]}>chat is empty</Card>
            )
          ) : (
            <Card className={styles["info-message"]}>no chat selected</Card>
          )}
        </div>
        {conversation != null && (
          <ChatInputForm onSend={handleSend} ref={inputRef} />
        )}
      </div>
    </Grid>
  );
};

export default Chat;
