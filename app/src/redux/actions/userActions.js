import { ActionTypes } from "../action-types/index";

export const setUserAction = (user) => {
  return {
    type: ActionTypes.SET_USER,
    payload: user,
  };
};

export const removeUserAction = () => {
  return {
    type: ActionTypes.REMOVE_USER
  };
};