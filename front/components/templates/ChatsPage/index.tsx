import { Grid } from "@material-ui/core";
import { Card } from "components/atoms";
import { ChatsList, Chat } from "components/organisms";
// import { useRouter } from "next/router";

import React, { useEffect } from "react";
import styles from "./ChatsPage.module.scss";
import { useAppDispatch, useAppSelector } from "store";
import {
  messengerChooseActiveConv,
  messengerLoadConvs,
} from "store/messenger/actions";
import IConversation from "src/interfaces/Conversation";
import { IChatsListProps } from "components/organisms/ChatsList";
import { IChatProps } from "components/organisms/Chat";

const ChatsPage = () => {
  // const router = useRouter();
  const messenger = useAppSelector((state) => state.messenger);
  const me = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(messengerLoadConvs());
  }, []);

  const handleOpenChat: IChatsListProps["onClick"] = (
    id: IConversation["_id"]
  ) => {
    dispatch(messengerChooseActiveConv(id));
  };
  const handleCloseChat: IChatProps["onClose"] = () => {
    dispatch(messengerChooseActiveConv(null));
  };
  return (
    <>
      <Grid
        container
        direction={"row"}
        component={Card}
        className={styles["container"]}
      >
        <Grid
          item
          container
          direction="column"
          xs={4}
          className={styles["left"]}
        >
          <Grid
            item
            container
            direction="row"
            className={styles["top-part"]}
            justify={"space-between"}
          >
            <Grid item container xs={8} alignItems={"center"}>
              Search
            </Grid>
            <Grid
              item
              container
              xs={4}
              // justify={"flex-end"}
              alignItems={"center"}
            >
              Add
            </Grid>
          </Grid>
          <Grid item className={styles["down-part"]}>
            <ChatsList
              me={me}
              chats={messenger.conversations}
              onClick={handleOpenChat}
              activeChat={messenger.activeConversation.conversation}
              isLoaded={messenger.isLoaded}
            />
          </Grid>
        </Grid>
        <Chat
          conversation={messenger.activeConversation.conversation}
          isLoaded={messenger.activeConversation.isLoaded}
          me={me}
          onClose={handleCloseChat}
        />
      </Grid>
    </>
  );
};

ChatsPage.defaultProps = {};
export default ChatsPage;
