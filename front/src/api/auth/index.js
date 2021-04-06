import Api from "src/api";
export function SignIn(data) {
  return Api.req.post("auth/signin", data).then((res) => res.me);
}

export function SignUp(data) {
  return Api.req.post("auth/signup", data).then((res) => res.me);
}
export function SignOut() {
  return Api.req.post("auth/signout").then((res) => res.success);
}

export function AuthCheck() {
  return Api.req.get("auth/me").then((res) => res.me);
}

export function EmailConfirm(username, code) {
  return Api.req.get(`auth/emailconfirmation/${username}/${code}`);
}
export function EmailConfirmationCodeResend(username) {
  debugger;
  return Api.req.get(`auth/emailconfirmation/resend/${username}`);
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
