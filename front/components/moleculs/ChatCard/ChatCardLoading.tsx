import { Card} from "components/atoms";
import React from "react";
import styles from "./ChatCard.module.scss";
// import { Grid } from "@material-ui/core";

// import Link from "next/link";

const ChatCardLoading = () => {
  return <Card className={`${styles["container"]} ${styles["loading"]}`}>test</Card>;
};

export default ChatCardLoading;
