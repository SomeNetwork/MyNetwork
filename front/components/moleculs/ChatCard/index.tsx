import { Card, Image, Text } from "components/atoms";
import React from "react";
import styles from "./ChatCard.module.scss";

import IConversation from "src/interfaces/Conversation";
import IUser from "src/interfaces/User";
import { Grid } from "@material-ui/core";

// import Link from "next/link";

export interface ChatCardProps {
  conversation: IConversation;
  me: IUser;
  onClick: (id: IConversation["_id"]) => void;
  isActive: boolean;
}

const ChatCard = (props: ChatCardProps) => {
  const { conversation, onClick, isActive } = props;
  // const data = {
  //   name: conversation.name || "Chat without name",
  //   avatar: conversation.avatar,
  //   lastMessage: {
  //     content:
  //       conversation.lastMessage.length > 0
  //         ? conversation.lastMessage[0]?.content
  //         : "Chat is empty",
  //     date:
  //       conversation.lastMessage.length > 0
  //         ? conversation.lastMessage[0].createdAt
  //         : "",
  //   },
  //   // TODO:
  //   // lastMessage: conversation.lastMessage || "Chat is empty",
  // };

  const handleClick = () => onClick(conversation._id);
  // TODO:
  // if (conversation.type === "private") {
  //   // debugger;
  //   const interlocutor = conversation.members.find(
  //     (user) => user._id !== me._id
  //   );
  //   data.name = interlocutor?.username || data.name;
  //   data.avatar = interlocutor?.avatar || data.avatar;
  //   console.log(`conversation`, conversation);
  //   console.log(`interlocutor`, interlocutor);
  //   console.log(`data`, data);
  // }

  const lastMessage = {
    content:
      conversation.lastMessage.length > 0
        ? conversation.lastMessage[0]?.content
        : "Chat is empty",
    date:
      conversation.lastMessage.length > 0
        ? conversation.lastMessage[0].createdAt
        : "",
  };
  if (lastMessage.date) {
    const fullDate = new Date(lastMessage.date);
    const today = new Date();
    if (fullDate.toISOString().slice(0, 10) < today.toISOString().slice(0, 10))
      lastMessage.date = fullDate
        .toISOString()
        .slice(0, 10)
        .split("-")
        .reverse()
        .map((e) => e.slice(-2))
        .join(".");
    else lastMessage.date = fullDate.getHours() + ":" + fullDate.getMinutes();
  }
  return (
    <Card
      className={`${styles["container"]} ${isActive ? styles["active"] : ""}`}
      onClick={handleClick}
    >
      <Grid container xl={12} wrap={"nowrap"} spacing={2} justify={"center"}>
        <Grid item>
          <div className={styles["avatar"]}>
            <Image
              url={conversation.avatar}
              variant="avatar"
              className={styles["avatar"]}
            />
          </div>
        </Grid>
        <Grid
          item
          container
          xl={6}
          direction="column"
          className={styles["center-block"]}
          // justify={"center"}
        >
          <Grid item container>
            <Text variant="body">{conversation.name}</Text>
          </Grid>
          <Grid item container className={styles["lastmsg-container"]}>
            <Text variant="small" className={styles["lastmsg-text"]}>
              {lastMessage.content}
            </Text>
          </Grid>
        </Grid>
        <Grid item xl={3}>
          <Text variant="small" className={styles["lastmsg-text"]}>
            {lastMessage.date || ""}
          </Text>
        </Grid>
      </Grid>
    </Card>
  );
};

ChatCard.defaultProps = {
  conversation: {
    _id: Date.now(),
    name: "chat 1",
    avatar: undefined,
    // messagesIds: any[],
    usersIds: [],
    ownderId: "",
    users: [],
  },
};

export default ChatCard;
