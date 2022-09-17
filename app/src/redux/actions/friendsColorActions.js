import { ActionTypes } from "../action-types/index";

export const setFriendsColor = (obj) => {
  return {
    type: ActionTypes.SET_FRIENDS_COLOR,
    payload: obj
  };
};