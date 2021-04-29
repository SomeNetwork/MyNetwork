import { IAuthState } from "./auth/types"
import { IAuthFormState } from "./authForm/types"
import { INotificationsState } from "./notifications/reducers"
import { IUserPageState } from "./userPage/types"
import { IUsersState } from "./users/type"

export interface IAction {
  type: string,
  payload: any,
}
export type IActionWithoutPayload = Omit<IAction, "payload">


export type TAction<P extends IAction> = (payload: P["payload"]) => P
export type TActionWithoutPayload<P extends IActionWithoutPayload> = () => P



export interface IRootState {
  auth: IAuthState,
  authForm: IAuthFormState,
  notifications: INotificationsState,
  users: IUsersState,
  userPage: IUserPageState,
}
// export type IRootState = IStore | undefined
