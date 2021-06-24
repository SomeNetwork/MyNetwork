import { IResponse } from "@api/axios";
import API from "src/api";
import IConversation, { IConversationReadData, INewConversationData } from "src/interfaces/Conversation";
import IUser from "src/interfaces/User";


export interface ICreateResponse extends IResponse {
  data: {
    conversation: IConversation
  },
}
export interface IReadResponse extends IResponse {
  data: {
    conversation: IConversation
  },
}
export interface IGetPrivateIdByUserResponse extends IResponse {
  data: {
    convId: IConversation["_id"]
  },
}
export interface IUpdateResponse extends IResponse {
  data: {
    conv: IConversation
  },
}
export interface IListResponse extends IResponse {
  data: {
    conversations: IConversation[]

  }
}
// interface INewConversationData extends IConversationOptional {

export function create(data: INewConversationData) {
  return API.req.post<ICreateResponse>(`/conversations/create`, data).then((data) => {
    console.log("data :>> ", data);
    if (data.success) {
      return data.data;
    }
  });
}

export function read(data: IConversationReadData) {
  const { id } = data;
  return API.req.get<IReadResponse>(`/conversations/${id}`).then((data) => {
    console.log("data :>> ", data);
    if (data.success) {
      return data.data;
    }
  });
}
export function getPrivateIdByUser(data: IUser) {
  const { _id } = data;
  return API.req.get<IGetPrivateIdByUserResponse>(`/conversations/private/${_id}`).then((data) => {
    console.log("data :>> ", data);
    if (data.success) {
      return data.data;
    }
  });
}
export function update(oldData: IConversation, newData: IConversation) {
  const { _id: id } = oldData;
  return API.req.post<IUpdateResponse>(`/conversations/update/${id}`, newData).then((data) => {
    console.log("data :>> ", data);
    if (data.success) {
      return data.data;
    }
  });
}
export function list(config: any) {
  return API.req.post<IListResponse>(`/conversations`, { config }).then((data) => {
    console.log("data :>> ", data);
    if (data.success) {
      return data.data;
    }
  });
}


const User = { create, read, update, list, getPrivateIdByUser };

export default User;
