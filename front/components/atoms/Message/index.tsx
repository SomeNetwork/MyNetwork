import React from "react";
import IMessage from "src/interfaces/Message";
import { Card } from "..";
import styles from "./Message.module.scss";
interface IMessageProps {
  message: IMessage;
  isOwner: boolean;
}

const Message = (props: IMessageProps) => {
  const { message, isOwner } = props;
  console.log(`styles`, styles);
  return (
    <Card
      className={`${styles["container"]} ${
        isOwner ? styles["right"] : styles["left"]
      }`}
    >
      {message.content}
    </Card>
  );
};

export default Message;
