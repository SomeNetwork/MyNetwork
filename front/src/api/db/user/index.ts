import { IResponse } from "@api/axios";
import API from "src/api";
import IUser, { IUserOptional } from "src/interfaces/User";


interface IReadResponse extends IResponse {
  data: {
    user: IUser,
    isOwner: boolean
  },
  success: boolean
}
interface IUpdateResponse extends IResponse {
  data: {
    user: IUserOptional,
    isOwner: boolean
  },
}
interface IListResponse extends IResponse {
  data: {
    users: IUser[],
  }
}
export function read(data: { username: string }) {
  const { username } = data;
  return API.req.get<IReadResponse>(`/users/${username}`).then((data) => {
    console.log("data :>> ", data);
    if (data.success) {
      return data.data;
    }
  });
}
export function update(oldData: IUserOptional, newData: IUserOptional) {
  const { username } = oldData;
  return API.req.post<IUpdateResponse>(`/users/update/${username}`, newData).then((data) => {
    console.log("data :>> ", data);
    if (data.success) {
      return data.data;
    }
  });
}
export function list(config: any) {
  return API.req.post<IListResponse>(`/users`, { config }).then((data) => {
    console.log("data :>> ", data);
    if (data.success) {
      return data.data;
    }
  });
}


const User = { read, update, list };

export default User;
