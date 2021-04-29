import { IAction } from "store/types";

export enum NotificationsActionType {
    NOTIFICATION_CREATE = "NOTIFICATION_CREATE",
    NOTIFICATION_UPDATE = "NOTIFICATION_UPDATE",
    NOTIFICATION_CLOSE = "NOTIFICATION_CLOSE",
    NOTIFICATION_DELETE = "NOTIFICATION_DELETE",
}

export enum NotificationVariants {
    success = "success",
    info = "info",
    warning = "warning",
    error = "error",
}

export interface INotification {
    variant: NotificationVariants,
    text: string,
    id: string,
    hidden?: boolean | undefined
}

export interface INotificationWithoutId extends Omit<INotification, "id"> { id?: string }



export interface IActionCreate extends IAction {
    type: NotificationsActionType.NOTIFICATION_CREATE,
    payload: INotification
}

// FIXME: 
export interface IActionCreateWithoutId extends IAction {
    type: NotificationsActionType.NOTIFICATION_CREATE,
    // FIXME: 
    payload: INotificationWithoutId
}
export interface IActionUpdate extends IAction {
    type: NotificationsActionType.NOTIFICATION_UPDATE,
    payload: {
        variant?: INotification["variant"],
        text?: INotification["text"],
        id: INotification["id"],
    }
}
export interface IActionClose extends IAction {
    type: NotificationsActionType.NOTIFICATION_CLOSE,
    payload: {
        id: INotification["id"],
    }
}
export interface IActionDelete extends IAction {
    type: NotificationsActionType.NOTIFICATION_DELETE,
    payload: {
        id: INotification["id"],
    }
}

type TNotificationsActions =
    | IActionCreate
    | IActionUpdate
    | IActionClose
    | IActionDelete

export default TNotificationsActions