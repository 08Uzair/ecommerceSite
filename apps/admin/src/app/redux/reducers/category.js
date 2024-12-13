import { FETCH_CATEGORY } from "../constants/actionTypes";

const categoryReducer = (category = [], action) => {
  switch (action.type) {
    case FETCH_CATEGORY:
      return action.payload;

    default:
      return category;
  }
};

export default categoryReducer;
