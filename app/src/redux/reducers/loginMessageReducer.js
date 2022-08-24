import { ActionTypes } from "../action-types/index";
const intialState = false;

export const loginMessageReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.LOGIN_MESSAGE:
      if(payload !== false) {
        return payload;
      }
    default:
      return state;
  }
};