import { ActionTypes } from "../action-types/index";

export const setLifxState = (obj) => {
  return {
    type: ActionTypes.SET_LIFX_STATE,
    payload: obj
  };
};

export const updateLifxPower = (string) => {
  return {
    type: ActionTypes.UPDATE_LIFX_POWER,
    payload:string
  }
}