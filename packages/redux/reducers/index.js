import { combineReducers } from "redux";
import products from "./products";
import cart from "./cart";
import blogs from './blogs';
import profile from './profile'
import category from './category'
import inbox from './inbox'
const rootReducer = combineReducers({
  products,
  cart,
  blogs,
  category,
  inbox,
  profile
});

export default rootReducer;
