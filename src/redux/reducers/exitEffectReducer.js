import { ActionTypes } from "../action-types/index";
const intialState = {
  bool: false
};

export const exitEffectReducer = (state = intialState, { type, payload }) => {
  let newState = Object.assign({}, state);

  switch (type) {
    case ActionTypes.SET_EXIT_EFFECT:
      return payload;
    case ActionTypes.REMOVE_EXIT_EFFECT:
      newState.bool = false;
      return newState;
    default:
      return state;
  }
};