
export enum NotificationVariants {
    success = "success",
    info = "info",
    warning = "warning",
    error = "error",
}

export default interface INotification {
    variant: NotificationVariants,
    text: string,
    id: string,
    hidden?: boolean | undefined,
    onClick?: () => void,
    createdAt?: string,
}
