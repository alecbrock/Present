import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { friendsColorReducer } from "./friendsColorReducer";
import { lifxStateReducer } from "./lifxStateReducer";

const reducers = combineReducers({
  user: userReducer,
  friendsColor: friendsColorReducer,
  lifxState: lifxStateReducer,
});
export default reducers;