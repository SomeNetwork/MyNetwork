import { IResponse } from "@api/axios";
import API from "src/api";
import IMessage from "src/interfaces/Message";

interface ICreateResponse extends IResponse {
  data: {
    message: IMessage
  }

}

interface IListResponse extends IResponse {
  data: {
    messages: IMessage[]

  }
}
type INewMessageData = Omit<IMessage, "_id">
export function create(data: INewMessageData) {
  return API.req.post<ICreateResponse>(`/messages/create`, data).then((data) => {
    console.log("data :>> ", data);
    if (data.success) {
      return data.data;
    }
  });
}


export function list(config: any) {
  return API.req.post<IListResponse>(`/messages`, { config }).then((data) => {
    console.log("data :>> ", data);
    if (data.success) {
      return data.data;
    }
  });
}


const User = { create, list };

export default User;
