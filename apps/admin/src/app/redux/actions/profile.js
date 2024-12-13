import { toast } from "react-toastify";
import * as api from "../api";
import {
  FETCH_PROFILES,
  FETCH_PROFILES_ID,
  CREATE_PRODUCT,
  DELETE_PROFILES,
  UPDATE_PROFILES,
} from "../constants/actionTypes";

export const getProfiles = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProfile();
    dispatch({ type: FETCH_PROFILES, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createProfile = (profile) => async (dispatch) => {
  const profileExists = await getProfileByEmail(profile.data.email);
  if (profileExists.length > 0) {
    toast.info("Profile already exists");
    return;
  }
  try {
    const { data } = await api.createProfile(profile);
    dispatch({ type: CREATE_PRODUCT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getProfileByID = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchProfileById(id);
    dispatch({ type: FETCH_PROFILES_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = (id, updateProfile) => async (dispatch) => {
  try {
    const { data } = await api.updateProfile(id, updateProfile);
    dispatch({ type: UPDATE_PROFILES, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProfile = (id) => async (dispatch) => {
  try {
    await api.deleteProfile(id);
    dispatch({ type: DELETE_PROFILES, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const getProfileByEmail = async (email) => {
  const response = await api.fetchProfile();
  const profiles = response.data.data;
  const filteredProfiles = profiles.filter((profile) => profile.email == email);

  return filteredProfiles;
};
