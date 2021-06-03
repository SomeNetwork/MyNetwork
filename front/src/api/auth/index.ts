import { IResponse } from "@api/axios";
import Api from "src/api";
import IUser, { IUserOptional } from "src/interfaces/User";

export interface ISignInResponse extends IResponse {
  me: IUser
  body: { me: IUser }
}
export function SignIn(data: {
  username: IUser["username"],
  password: IUser["password"]
}) {
  return Api.req.post<ISignInResponse>("auth/signin", data).then((res) => res.me);
}

export function SignUp(data: IUserOptional) {
  return Api.req.post<IResponse>("auth/signup", data);
}
export function SignOut() {
  return Api.req.post<IResponse>("auth/signout").then((res) => res.success);
}
export interface IAuthCheckResponse extends IResponse {
  me: IUser
}
export function AuthCheck() {
  return Api.req.get<IAuthCheckResponse>("auth/me").then((res) => res.me);
}

export function EmailConfirm(username: string, code: string) {
  return Api.req.get<IResponse>(`auth/emailconfirmation/${username}/${code}`);
}
export function EmailConfirmationCodeResend(username: string) {
  return Api.req.get<IResponse>(`auth/emailconfirmation/resend/${username}`);
}

const Auth = {
  SignIn,
  SignUp,
  SignOut,
  AuthCheck,
  EmailConfirm,
  EmailConfirmationCodeResend,
};
export default Auth;
