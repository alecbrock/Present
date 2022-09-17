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

export const updateUserFriends = (obj) => {
  return {
    type: ActionTypes.UPDATE_USER_FRIENDS,
    payload: obj
  };
};

export const updateUserProfileColor = (obj) => {
  return {
    type: ActionTypes.UPDATE_USER_PROFILE_COLOR,
    payload: obj
  };
};

export const updateUserRecentColor = (obj) => {
  return {
    type: ActionTypes.UPDATE_USER_RECENT_COLOR,
    payload: obj
  };
};

export const updateUserScene = (obj) => {
  return {
    type: ActionTypes.UPDATE_USER_SCENE,
    payload: obj
  };
};