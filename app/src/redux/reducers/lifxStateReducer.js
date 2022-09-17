import { ActionTypes } from "../action-types/index";
const intialState = false;

export const lifxStateReducer = (state = intialState, { type, payload }) => {
  let newState = Object.assign({}, state);

  switch (type) {
    case ActionTypes.SET_LIFX_STATE:
      return payload;
    case ActionTypes.UPDATE_LIFX_POWER:
      newState.power = payload;
      return newState;
    default:
      return state;
  }
};