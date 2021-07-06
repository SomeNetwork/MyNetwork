import WS from "@api/ws";
import React, { useEffect } from "react";
import IConversation from "src/interfaces/Conversation";
import IMessage from "src/interfaces/Message";
import { NotificationVariants } from "src/interfaces/Notification";
import { IWSEventHandler } from "src/interfaces/WS";
import { useAppDispatch, useAppSelector } from "store";
import {
  convsEventNewConvCreated,
  convsLoadConvs,
} from "store/conversations/actions";
import { messengerEventNewMessageCreated } from "store/messenger/actions";
import { notificationCreate } from "store/notifications/actions";

const AppInit = () => {
  const isAuth = useAppSelector((store) => store.auth.isAuth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const subNewMessage: IWSEventHandler = (data: IMessage) => {
      dispatch(messengerEventNewMessageCreated(data));
    };
    if (isAuth) {
      dispatch(convsLoadConvs());
      WS.subscribe("new message created", subNewMessage);
    }
    return () => {
      WS.unsubscribe("new message created", subNewMessage);
    };
  }, [isAuth, dispatch]);
  useEffect(() => {
    WS.reconnect();
  }, [isAuth]);
  useEffect(() => {
    /*  */
    const handlerInfoNotification: IWSEventHandler = (data) => {
      dispatch(
        notificationCreate({ variant: NotificationVariants.info, text: data })
      );
    };
    const handlerErrorNotification: IWSEventHandler = (data) => {
      dispatch(
        notificationCreate({ variant: NotificationVariants.error, text: data })
      );
    };
    const handlerWarningNotification: IWSEventHandler = (data) => {
      dispatch(
        notificationCreate({
          variant: NotificationVariants.warning,
          text: data,
        })
      );
    };
    const handlerSuccessNotification: IWSEventHandler = (data) => {
      dispatch(
        notificationCreate({
          variant: NotificationVariants.success,
          text: data,
        })
      );
    };
    /*  */
    const handlerNewConversation: IWSEventHandler = (data: IConversation) => {
      dispatch(convsEventNewConvCreated(data));
    };
    /*  */
    WS.subscribe("info", handlerInfoNotification);
    WS.subscribe("error", handlerErrorNotification);
    WS.subscribe("warning", handlerWarningNotification);
    WS.subscribe("success", handlerSuccessNotification);
    /*  */
    WS.subscribe("new conversation created", handlerNewConversation);
    return () => {
      WS.unsubscribe("info", handlerInfoNotification);
      WS.unsubscribe("error", handlerErrorNotification);
      WS.unsubscribe("warning", handlerWarningNotification);
      WS.unsubscribe("success", handlerSuccessNotification);
      WS.unsubscribe("new conversation created", handlerNewConversation);
    };
  }, [dispatch]);

  return <div style={{ display: "none" }} />;
};

export default AppInit;
