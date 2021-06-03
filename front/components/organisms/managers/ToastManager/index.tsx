import { Toast } from "components/atoms";
import React from "react";
import INotification from "src/interfaces/Notification";
import { useAppDispatch, useAppSelector } from "store";
import { notificationClose } from "store/notifications/actions";
import styles from "./ToastManager.module.scss";

const ToastManager = () => {
  const toasts = useAppSelector((state) => state.notifications);
  const dispatch = useAppDispatch();

  const onClose = (id: INotification["id"]): void => {
    dispatch(notificationClose({ id }));
  };

  return (
    <div className={`${styles["toasts-container"]}`}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          text={toast.text}
          variant={toast.variant}
          onClick={toast.onClick}
          hidden={toast.hidden}
          onClose={() => onClose(toast.id)}
        />
      ))}
    </div>
  );
};


export default ToastManager;
