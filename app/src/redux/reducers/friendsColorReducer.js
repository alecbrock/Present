import { ActionTypes } from "../action-types/index";
const intialState = {};

export const friendsColorReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_FRIENDS_COLOR:
      return payload;
    default:
      return state;
  }
};