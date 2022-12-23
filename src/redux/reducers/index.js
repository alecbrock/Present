import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { friendsColorReducer } from "./friendsColorReducer";
import { lifxStateReducer } from "./lifxStateReducer";
import { communityScenesReducer } from "./communityScenesReducer";
import { exitEffectReducer } from "./exitEffectReducer";

const reducers = combineReducers({
  user: userReducer,
  friendsColor: friendsColorReducer,
  lifxState: lifxStateReducer,
  communityScenes: communityScenesReducer,
  exitEffect: exitEffectReducer,
});
export default reducers;