import { ActionTypes } from "../action-types/index";

export const setLoginMessage = (message) => {
  return {
    type: ActionTypes.LOGIN_MESSAGE,
    payload: message,
  };
};