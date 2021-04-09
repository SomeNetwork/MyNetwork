// const { USER_PAGE_SAVE } = require("./actions");
//import {USER_PAGE_SAVE} from "./actions";

import {ActionType} from "./actions"

import {UserPageActionType} from "./actions";

// type UserType = {
//     name?: string,
//     familyName?: string
// }

const defaultState = {
    user: {} as any,
    isOwner: false,
    isLoaded: false,
};

type DefaultStateType = typeof defaultState;


export const userPageReducer = (state = defaultState, action: UserPageActionType): DefaultStateType => {
    const {type, payload} = action;
    switch (type) {
        // case USER_PAGE_LOAD:
        //   return {
        //     ...sate,
        //   };
        case ActionType.USER_PAGE_SAVE:
            return {
                ...state,
                ...payload,
                isLoaded: true,
            };
    }
    return state;
};


