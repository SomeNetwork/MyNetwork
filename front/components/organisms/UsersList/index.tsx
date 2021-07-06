import { DB } from "@api";
import { UserCard } from "components/moleculs";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  AutoSizer,
  List as VirtualizedList,
  ListRowProps,
} from "react-virtualized";
import IUser from "src/interfaces/User";
import { useAppDispatch, useAppSelector } from "store";
import { messengerChooseActiveConv } from "store/messenger/actions";
import { usersLoadUsers } from "store/users/actions";
import styles from "./UsersList.module.scss";

const UsersList = () => {
  const state = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(usersLoadUsers());
  }, []);

  const handleGoToChatWithUser = (user: IUser) => {
    DB.Conversation.getPrivateIdByUser(user).then((res) => {
      if (res) {
        dispatch(messengerChooseActiveConv(res.convId));
        router.push({ pathname: "/chats" });
      }
    });
  };

  const rowRenderer = ({
    key,
    index,
    /* isScrolling, isVisible, */ style,
  }: ListRowProps) => {
    return (
      <div key={key} style={{ ...style, display: "flex", padding: 8 }}>
        <UserCard
          user={state.users[index]}
          goToChat={() => handleGoToChatWithUser(state.users[index])}
        />
      </div>
    );
  };

  return (
    <div className={styles["container"]}>
      <AutoSizer>
        {({ height, width }: { height: number; width: number }) => (
          <VirtualizedList
            // width={800}
            // height={300}
            width={width}
            height={height}
            rowCount={state.users.length}
            rowHeight={100}
            rowRenderer={rowRenderer}
            style={{ outline: "none" }}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default UsersList;
