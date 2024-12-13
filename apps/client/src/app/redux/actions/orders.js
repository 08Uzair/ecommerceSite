import * as api from "../api";
import { CREATE_ORDERS } from "../constants/actionTypes";

export const addOrders = (newOrder) => async (dispatch) => {
  try {
    const { data } = await api.createOrder(newOrder);
    dispatch({ type: CREATE_ORDERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
