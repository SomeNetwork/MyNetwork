import { IResponse } from "@api/axios";
import API from "@api";
import IMessage, { INewMessageData } from "src/interfaces/Message";
import { WSEvent } from "src/interfaces/WS";

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

export function _create(data: INewMessageData) {
  return API.req.post<ICreateResponse>(`/messages/create`, data).then((data) => {
    if (data.success) {
      return data.data;
    }
  });
}
export function create(data: INewMessageData) {
  const event: WSEvent = { name: "new message create", data }
  API.WS.emit(event)
}


export function list(config: any) {
  return API.req.post<IListResponse>(`/messages`, { config }).then((data) => {
    if (data.success) {
      return data.data;
    }
  });
}


const User = { create, list };

export default User;
