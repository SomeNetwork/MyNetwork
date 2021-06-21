import { ChatCard, ChatCardLoading } from "components/moleculs";
import { ChatCardProps } from "components/moleculs/ChatCard";
import React from "react";
import {
  AutoSizer,
  List as VirtualizedList,
  ListRowProps,
} from "react-virtualized";
import IConversation from "src/interfaces/Conversation";
import IUser from "src/interfaces/User";
import { IMessengerState } from "store/messenger/type";
import styles from "./ChatsList.module.scss";
export interface IChatsListProps {
  chats: IConversation[];
  onClick: ChatCardProps["onClick"];
  me: IUser;
  activeChat: IMessengerState["activeConversation"]["conversation"];
  isLoaded: IMessengerState["isLoaded"];
}

const ChatsList = (props: IChatsListProps) => {
  const { me, chats, onClick, activeChat, isLoaded } = props;

  const rowRenderer = ({
    key,
    index,
    /* isScrolling, isVisible, */ style,
  }: ListRowProps) => {
    if (isLoaded)
      return (
        <div key={chats[index]._id} style={style}>
          <ChatCard
            me={me}
            conversation={chats[index]}
            onClick={onClick}
            isActive={!!activeChat && activeChat._id === chats[index]._id}
          />
        </div>
      );
    else return <ChatCardLoading key={key} />;
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <AutoSizer>
          {({ height, width }: { height: number; width: number }) => {
            console.log(`height`, height);
            console.log(`width`, width);
            return (
              <VirtualizedList
                // width={800}
                // height={300}
                width={width}
                height={height}
                rowCount={isLoaded ? chats.length : 4}
                rowHeight={90}
                rowRenderer={rowRenderer}
                style={{ outline: "none", padding: "0" }}
              />
            );
          }}
        </AutoSizer>
      </div>
    </div>
  );
};

export default ChatsList;
