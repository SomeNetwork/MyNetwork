import { TAction, TActionWithoutPayload } from "store/types";
import {

  IActionChooseActiveConv,
  IActionLoadActiveConv,
  IActionLocalSaveActiveConv,
  IActionFullUpdateActiveConv,
  IActionNextMessagesUpdateActiveConv,
  IActionCreateNewMessage,
  IActionEventNewMessageCreated,
  IActionCreateNewConv,
  IActionEventNewConvCreated,
  MessengersType,
  IActionSetScreen
} from "./type";


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

export const messengerSetScreen: TAction<IActionSetScreen> = (payload) => ({
  type: MessengersType.SET_SCREEN,
  payload,
});

