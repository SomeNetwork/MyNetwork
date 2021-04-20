import { UserCard } from "components/moleculs";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { AutoSizer, List as VirtualizedList } from "react-virtualized";
import { usersLoadUsers } from "store/users/actions";
import styles from "./UsersList.module.scss";

const UsersList = (props) => {
  const state = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersLoadUsers());
  }, []);

  const rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    return (
      <div key={key} style={style}>
        <UserCard user={state.users[index]} />
      </div>
    );
  };

  return (
    <div className={styles["container"]}>
      <AutoSizer>
        {({ height, width }) => {
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

UsersList.propTypes = {
  rowRenderer: PropTypes.node,
};

export default UsersList;
