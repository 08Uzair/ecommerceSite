import { combineReducers } from "redux";
import authReducer from "./auth";
import inbox from "./inbox";
import product from "./product";
import category from "./category";
import orders from "./orders";
import status from "./status";
import profile from "./profile";

const rootReducer = combineReducers({
  authReducer,
  inbox,
  product,
  category,
  orders,
  status,
  profile,
});

export default rootReducer;
