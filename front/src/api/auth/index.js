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

export function EmailConfirm(id, code) {
  return Api.req.get(`auth/emailconfirmation/${id}/${code}`);
}

const Auth = {
  SignIn,
  SignUp,
  SignOut,
  AuthCheck,
  EmailConfirm,
};
export default Auth;
