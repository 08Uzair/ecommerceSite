import * as api from "../api";
import { toast } from "react-toastify";
import {
  AUTH,
  FETCH_USER_ID,
  FETCH_USER,
  DELETE_USER,
} from "../constants/actionTypes";
export const signIn = (newUser) => async (dispatch) => {
  try {
    const { data } = await api.signIn(newUser);
    dispatch({ type: AUTH, payload: data });
    localStorage.setItem("itemName", "home");
    toast.success("Login Sucessfully");
  } catch (error) {
    return toast.error("Login Failed",error);
  }
};

export const signUp = (newUser) => async (dispatch) => {
  try {
    const { data } = await api.signUp(newUser);
    dispatch({ type: AUTH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUser();
    dispatch({ type: FETCH_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUserByID = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchUserById(id);
    dispatch({ type: FETCH_USER_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (email) => async (dispatch) => {
  const user = await getUserByEmail(email);
  console.log(user);

  try {
    toast.success("User Deleted Sucessfully");
    await api.deleteUser(user.documentId);
    dispatch({ type: DELETE_USER, payload: email });
  } catch (error) {
    console.log(error);
  }
};

export const getUserByEmail = async (email) => {
  const response = await api.fetchUser();
  console.log(response);
  const users = response.data;
  console.log(users);
  const filteredUser = users?.filter((user) => user?.email == email);
  console.log(filteredUser);
  return filteredUser[0];
};
