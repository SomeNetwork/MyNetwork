import { UserCard } from "components/moleculs";
import React, { useEffect } from "react";
import {
  AutoSizer,
  List as VirtualizedList,
  ListRowProps,
} from "react-virtualized";
import { useAppDispatch, useAppSelector } from "store";
import { usersLoadUsers } from "store/users/actions";
import styles from "./UsersList.module.scss";

const UsersList = () => {
  const state = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(usersLoadUsers());
  }, []);

  const rowRenderer = ({
    key,
    index,
    /* isScrolling, isVisible, */ style,
  }: ListRowProps) => {
    return (
      <div key={key} style={style}>
        <UserCard user={state.users[index]} />
      </div>
    );
  };

  return (
    <div className={styles["container"]}>
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
              rowCount={state.users.length}
              rowHeight={100}
              rowRenderer={rowRenderer}
              style={{ outline: "none" }}
            />
          );
        }}
      </AutoSizer>
    </div>
  );
};

export default UsersList;
