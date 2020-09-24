import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";
import adReducer from "./adReducer";
import modalReducer from "./modalReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  users: userReducer,
  ads: adReducer,
  modal: modalReducer,
});
