import { combineReducers } from "redux";
import Authenticate from "./Auth/reducer";
import UI from './UI/reducer'
const rootReducer = combineReducers({
  Auth: Authenticate,
  UI
});
export default rootReducer;
