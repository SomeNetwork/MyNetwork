import { Toast } from "components/atoms";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  notificationClose,
  notificationDelete,
  notificationUpdate,
} from "store/notifications/actions";
import styles from "./ToastManager.module.scss";
const ToastManager = () => {
  const toasts = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const onClose = (id) => {
    dispatch(notificationClose({ id }));

    // dispatch(notificationUpdate({ id, hidden: true }));
    // let timer = setTimeout(() => {
    //   dispatch(notificationDelete({ id }));
    //   clearTimeout(timer);
    // }, 1000);
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
ToastManager.propTypes = {};

export default ToastManager;
