import { ActionTypes } from "../action-types/index";
const intialState = false;

export const userReducer = (state = intialState, { type, payload }) => {
  let newState = Object.assign({}, state);

  switch (type) {
    case ActionTypes.SET_USER:
      return payload;
    case ActionTypes.REMOVE_USER:
      return false;
    case ActionTypes.UPDATE_USER_FRIENDS:
      newState.friends = payload.friends;
      newState.pendingFriends = payload.pendingFriends;
      return newState;
    case ActionTypes.UPDATE_USER_PROFILE_COLOR:
      newState.profileColor = payload.profileColor;
      return newState;
    case ActionTypes.UPDATE_USER_RECENT_COLOR:
      newState.recentColors = payload.recentColors;
      return newState;
    case ActionTypes.UPDATE_USER_SCENE:
      newState.scenes = payload.scenes;
      return newState;
    default:
      return state;
  }
};