import { ActionTypes } from "../action-types/index";
const intialState = {};

export const userReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_USER:
      return payload;
    case ActionTypes.REMOVE_USER:
      return false;
    default:
      return state;
  }
};