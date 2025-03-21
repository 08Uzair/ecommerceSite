import {
  LOGOUT,
  AUTH,
  FETCH_USER_ID,
  FETCH_USER,
  DELETE_USER,
} from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("adminProfile", JSON.stringify({ ...action?.payload }));

      // console.log(action.payload);
      return {
        ...state,
        authData: action.payload,
        loading: false,
        errors: null,
      };
    case LOGOUT:
      return { ...state, authData: null, loading: false, errors: null };
 
    case FETCH_USER:
      return action.payload;

    case FETCH_USER_ID:
      return [action.payload];
    default:
      return state;
    case DELETE_USER:
      return state.filter((user) => user._id !== action.payload._id);
  }
};
export default authReducer;
