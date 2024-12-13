import {
  FETCH_ORDERS,
  FETCH_ORDERS_ID,
  DELETE_ORDERS,
} from "../constants/actionTypes";

const initialState = {
  orders: [],
  totalPrice: [], // Adjust to `number` or another type if it's not an array
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        orders: action.payload, // Updated to `orders`
      };

    // case FETCH_TOTAL:
    //   return {
    //     ...state,
    //     totalPrice: action.payload,
    //   };

    case FETCH_ORDERS_ID:
      return {
        ...state,
        orders: [action.payload], // Wrap in an array for consistency
      };

    case DELETE_ORDERS:
      return {
        ...state,
        orders: state.orders.filter(
          (order) => order._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

export default ordersReducer;
