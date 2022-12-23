import { ActionTypes } from "../action-types/index";

export const setCommunityScenes = (arr) => {
  return {
    type: ActionTypes.SET_COMMUNITY_SCENES,
    payload: arr
  };
};