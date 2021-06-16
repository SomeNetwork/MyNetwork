import { TAction, TActionWithoutPayload } from "store/types";
import {
  IActionSetFilters,
  IActionLoadConvs,
  IActionLocalSaveConvs,
  IActionChooseActiveConv,
  IActionLoadActiveConv,
  IActionLocalSaveActiveConv,
  IActionFullUpdateActiveConv,
  IActionNextMessagesUpdateActiveConv,
  IActionCreateNewMessage,
  IActionEventNewMessageCreated,
  IActionCreateNewConv,
  IActionEventNewConvCreated,
  MessengersType
} from "./type";


export const messengerLoadConvs: TActionWithoutPayload<IActionLoadConvs> = () => ({
  type: MessengersType.LOAD_CONVS,
});
export const messengerLocalSaveConvs: TAction<IActionLocalSaveConvs> = (payload) => ({
  type: MessengersType.LOCAL_SAVE_CONVS,
  payload,
});
export const messengerSetFilters: TAction<IActionSetFilters> = (payload) => ({
  type: MessengersType.SET_FILTERS,
  payload,
});
export const messengerChooseActiveConv: TAction<IActionChooseActiveConv> = (payload) => ({
  type: MessengersType.CHOOSE_ACTIVE_CONV,
  payload,
});
export const messengerLoadActiveConv: TAction<IActionLoadActiveConv> = (payload) => ({
  type: MessengersType.LOAD_ACTIVE_CONV,
  payload,

});
export const messengerLocalSaveActiveConv: TAction<IActionLocalSaveActiveConv> = (payload) => ({
  type: MessengersType.LOCAL_SAVE_ACTIVE_CONV,
  payload,
});
export const messengerFullUpdateActiveConv: TActionWithoutPayload<IActionFullUpdateActiveConv> = () => ({
  type: MessengersType.FULL_UPLOAD_ACTIVE_CONV,
});
export const messengerNextMessagesUpdateActiveConv: TActionWithoutPayload<IActionNextMessagesUpdateActiveConv> = () => ({
  type: MessengersType.LOAD_ACTIVE_CONV,
});
export const messengerCreateNewMessage: TAction<IActionCreateNewMessage> = (payload) => ({
  type: MessengersType.CREATE_NEW_MESSAGE,
  payload,
});
export const messengerEventNewMessageCreated: TAction<IActionEventNewMessageCreated> = (payload) => ({
  type: MessengersType.EVENT_NEW_MESSAGE_CREATED,
  payload,
});
export const messengerCreateNewConv: TAction<IActionCreateNewConv> = (payload) => ({
  type: MessengersType.CREATE_NEW_CONVERSATION,
  payload,
});
export const messengerEventNewConvCreated: TAction<IActionEventNewConvCreated> = (payload) => ({
  type: MessengersType.EVENT_NEW_CONVERSATION_CREATED,
  payload,
});

