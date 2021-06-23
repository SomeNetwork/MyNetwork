import { Grid /* TextField */ } from "@material-ui/core";
import { Card, IconButton, Input, NavTab } from "components/atoms";
import { ChatsList, ChatCreateForm, Chat } from "components/organisms";
// import { useRouter } from "next/router";

import React, { useCallback, useEffect } from "react";
import styles from "./ChatsPage.module.scss";
import { useAppDispatch, useAppSelector } from "store";
import {
  messengerChooseActiveConv,
  messengerSetScreen,
} from "store/messenger/actions";
import { IChatsListProps } from "components/organisms/ChatsList";
import { IChatProps } from "components/organisms/Chat";
import { MessengerScreens } from "store/messenger/type";
import { Add } from "@material-ui/icons";
import {
  convsLoadConvs,
  convsSetNameFilter,
  convsSetType,
} from "store/conversations/actions";
import { ConversationTypes } from "src/interfaces/Conversation";

const ChatsPage = () => {
  // const router = useRouter();
  const messenger = useAppSelector((state) => state.messenger);
  const conversations = useAppSelector((state) => state.conversations);
  const me = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(convsLoadConvs());
    // dispatch(messengerLoadConvs());
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
            <Grid item container xs={10} className={styles["search-container"]}>
              {/* <TextField
                name="search"
                value={conversations.nameFilter}
                onChange={(oEvent) =>
                  dispatch(convsSetNameFilter(oEvent.target.value))
                }
                placeholder="search"
                fullWidth
                variant="outlined"
                size="small"
              /> */}
              {/* <Search /> */}
              <Input
                label="Search"
                name="search"
                value={conversations.nameFilter}
                onChange={(value) =>
                  dispatch(convsSetNameFilter(value as string))
                }
                // placeholder="search"
                fluid
              />
            </Grid>
            <Grid item container xs={2} justify={"flex-end"}>
              <IconButton icon={Add} onClick={handleOpenCreateForm} />
            </Grid>
          </Grid>
          <Grid item className={styles["down-part"]}>
            <ChatsList
              me={me}
              chats={conversations.conversations}
              onClick={handleOpenChat}
              activeChat={messenger.activeConversation.conversation}
              isLoaded={conversations.isLoaded}
            />
            <Grid container className={styles["chat-types"]}>
              <NavTab
                type="tab"
                active={conversations.type == ConversationTypes.group}
                onClick={() => dispatch(convsSetType(ConversationTypes.group))}
              >
                Group
              </NavTab>
              <NavTab
                type="tab"
                active={conversations.type == ConversationTypes.private}
                onClick={() =>
                  dispatch(convsSetType(ConversationTypes.private))
                }
              >
                Private
              </NavTab>
            </Grid>
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
