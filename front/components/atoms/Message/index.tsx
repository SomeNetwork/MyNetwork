import React, { memo } from "react";
import IMessage, { MessageType } from "src/interfaces/Message";
import { Card, Text } from "..";
import styles from "./Message.module.scss";
interface IMessageProps {
  message: IMessage;
  isOwner: boolean;
}

const Message = (props: IMessageProps) => {
  const { message, isOwner } = props;
  switch (message.type) {
    case MessageType["info"]:
      return (
        <Card className={`${styles["container"]} ${styles["info"]}`}>
          {message.content}
        </Card>
      );
    default:
      return (
        <Card
          className={`${styles["container"]} ${
            isOwner ? styles["right"] : styles["left"]
          }`}
        >
          <Text variant="small" className={styles["author"]}>
            {message.author?.username || "unknown"}
          </Text>
          <Text variant="body2">{message.content}</Text>
        </Card>
      );
  }
};

export default memo(
  Message,
  (prev, next) =>
    prev.message.content == next.message.content &&
    prev.isOwner === next.isOwner
);
