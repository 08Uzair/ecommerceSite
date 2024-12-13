import {
  FETCH_PROFILES,
  FETCH_PROFILES_ID,
  CREATE_PROFILE,
  DELETE_PROFILES,
  UPDATE_PROFILES,
} from "../constants/actionTypes";

const profilesReducer = (profile = [], action) => {
  switch (action.type) {
    case FETCH_PROFILES:
      return action.payload;

    case CREATE_PROFILE:
      return [...profile, action.payload];

    case FETCH_PROFILES_ID:
      return [action.payload];

    case DELETE_PROFILES:
      return profile.filter((profile) => profile._id !== action.payload._id);

    case UPDATE_PROFILES:
      return profile.map((profile) =>
        profile._id === action.payload._id ? action.payload : profile
      );

    default:
      return profile;
  }
};

export default profilesReducer;
