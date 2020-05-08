import users from "./usersReducer";
import auth from "./authReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  users,
  auth,
});

export default rootReducer;
