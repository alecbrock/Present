import { ActionTypes } from "../action-types/index";

export const setExitEffect = (effect) => {
  return {
    type: ActionTypes.SET_EXIT_EFFECT,
    payload: effect
  };
};

export const removeExitEffect = () => {
  return {
    type: ActionTypes.REMOVE_EXIT_EFFECT,
  };
};