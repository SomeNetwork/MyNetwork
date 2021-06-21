import WS from "@api/ws";
import React, { useEffect } from "react";
import IMessage from "src/interfaces/Message";
import { IWSEventHandler } from "src/interfaces/WS";
import { useAppDispatch, useAppSelector } from "store";
import {
  messengerEventNewMessageCreated,
  messengerLoadConvs,
} from "store/messenger/actions";

const AppInit = () => {
  const isAuth = useAppSelector((store) => store.auth.isAuth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const subNewMessage: IWSEventHandler = (data: IMessage) => {
      console.log(`new message come`, data);
      dispatch(messengerEventNewMessageCreated(data));
    };
    if (isAuth) {
      console.log(11, isAuth);
      dispatch(messengerLoadConvs());
      console.log(12, isAuth);
      WS.subscribe("new message", subNewMessage);
    }

    return () => {
      WS.unSubscribe("new message", subNewMessage);
      //
    };
  }, [isAuth, dispatch]);

  return <div></div>;
};

export default AppInit;
