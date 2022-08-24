import { combineReducers } from "redux";
import { loginMessageReducer } from "./loginMessageReducer";
const reducers = combineReducers({
  loginMessage: loginMessageReducer,
});
export default reducers;