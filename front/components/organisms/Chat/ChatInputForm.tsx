import React, { forwardRef, useState } from "react";
import { Button } from "components/atoms";
import { TextField } from "@material-ui/core";
import styles from "./Chat.module.scss";
// import IConversation from "src/interfaces/Conversation";
// import IUser from "src/interfaces/User";
import { Send } from "@material-ui/icons";
import IMessage from "src/interfaces/Message";

export interface IChatInputFormProps {
  onSend: (content: IMessage["content"]) => void;
}

const ChatInputForm = forwardRef(function ChatInputForm(
  props: IChatInputFormProps,
  inputRef
) {
  const [content, setContent] = useState<IMessage["content"]>("");

  const handleSend = (): void => {
    console.log("send1");

    if (content.trim()) {
      const { onSend } = props;
      onSend(content.trim());
      console.log("sended");
    }
    setContent("");
  };
  const handleChange = (oEvent: React.ChangeEvent<HTMLInputElement>): void => {
    setContent(oEvent.target.value);
  };

  const handleKeyPress = (
    oEvent: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    console.log(oEvent);
    if (oEvent.code === "Enter" && oEvent.shiftKey === false) {
      handleSend();
      oEvent.preventDefault();
    }
  };

  return (
    <div className={styles["input-container"]}>
      <TextField
        inputRef={inputRef}
        // ref={ref}
        className={styles["input"]}
        multiline
        rowsMax={2}
        variant="filled"
        size={"small"}
        value={content}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <Button onClick={handleSend} animated disabled={!content.trim()}>
        <Send />
      </Button>
    </div>
  );
});
export default ChatInputForm;