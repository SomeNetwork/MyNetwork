import { Grid } from "@material-ui/core";
import { Card, IconButton } from "components/atoms";
import { ChatsList, ChatCreateForm, Chat } from "components/organisms";
// import { useRouter } from "next/router";

import React, { useCallback, useEffect } from "react";
import styles from "./ChatsPage.module.scss";
import { useAppDispatch, useAppSelector } from "store";
import {
  messengerChooseActiveConv,
  messengerLoadConvs,
  messengerSetScreen,
} from "store/messenger/actions";
import { IChatsListProps } from "components/organisms/ChatsList";
import { IChatProps } from "components/organisms/Chat";
import { MessengerScreens } from "store/messenger/type";
import { Add } from "@material-ui/icons";

const ChatsPage = () => {
  // const router = useRouter();
  const messenger = useAppSelector((state) => state.messenger);
  const me = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(messengerLoadConvs());
  }, [dispatch]);

  const handleOpenChat: IChatsListProps["onClick"] = useCallback(
    (id) => {
      dispatch(messengerSetScreen(MessengerScreens.chat));
      dispatch(messengerChooseActiveConv(id));
    },
    [dispatch]
  );
  const handleCloseChat: IChatProps["onClose"] = useCallback(() => {
    dispatch(messengerChooseActiveConv(null));
  }, [dispatch]);
  const handleCloseCreateForm = useCallback(() => {
    dispatch(messengerSetScreen(MessengerScreens.chat));
  }, [dispatch]);
  const handleOpenCreateForm = useCallback(() => {
    dispatch(messengerSetScreen(MessengerScreens.fromCreate));
  }, [dispatch]);

  // const handleOpenChat: IChatsListProps["onClick"] = (id) => {
  //   dispatch(messengerChooseActiveConv(id));
  // };
  // const handleCloseChat: IChatProps["onClose"] = () => {
  //   dispatch(messengerChooseActiveConv(null));
  // };

  return (
    <Card className={styles["container"]}>
      <Grid
        container
        direction={"row"}
        // component={Card}
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
            alignItems={"center"}
          >
            <Grid item xs={10}>
              Search
            </Grid>
            <Grid
              item
              xs={2}
              // justify={"flex-end"}
            >
              <IconButton icon={Add} onClick={handleOpenCreateForm} />
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
        {messenger.screen === MessengerScreens.chat ? (
          <Chat
            conversation={messenger.activeConversation.conversation}
            isLoaded={messenger.activeConversation.isLoaded}
            me={me}
            onClose={handleCloseChat}
          />
        ) : messenger.screen === MessengerScreens.fromCreate ? (
          <ChatCreateForm me={me} onClose={handleCloseCreateForm} />
        ) : (
          // "other screen"
          <ChatCreateForm me={me} onClose={handleCloseCreateForm} />
        )}
      </Grid>
    </Card>
  );
};

ChatsPage.defaultProps = {};
export default ChatsPage;
