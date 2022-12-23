import { ActionTypes } from "../action-types/index";
const intialState = [];

export const communityScenesReducer = (state = intialState, { type, payload }) => {
  console.log(payload, 'in reducer');
  switch (type) {
    case ActionTypes.SET_COMMUNITY_SCENES:
      return payload;
    default:
      return state;
  }
};