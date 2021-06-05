import { IResponse } from "@api/axios";
import API from "src/api";
import IConversation, { IConversationOptional } from "src/interfaces/Conversation";


interface ICreateResponse extends IResponse {
  data: {
    conversation: IConversation
  },
}
interface IReadResponse extends IResponse {
  data: {
    conversation: IConversation
  },
}
interface IUpdateResponse extends IResponse {
  data: {
    conversation: IConversation
  },
}
interface IListResponse extends IResponse {
  data: {
    conversations: IConversation[]

  }
}
interface INewConversationData extends IConversationOptional {
  name: IConversation["name"]
}
export function create(data: INewConversationData) {
  return API.req.post<ICreateResponse>(`/conversations/create`, data).then((data) => {
    console.log("data :>> ", data);
    if (data.success) {
      return data.data;
    }
  });
}

interface INewConversationReadData extends IConversationOptional {
  id: IConversation["_id"]
}
export function read(data: INewConversationReadData) {
  const { id } = data;
  return API.req.get<IReadResponse>(`/conversations/${id}`).then((data) => {
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


const User = { create, read, update, list };

export default User;
