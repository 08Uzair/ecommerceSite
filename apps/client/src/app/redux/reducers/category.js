import { FETCH_CATEGORY, FETCH_CATEGORY_ID } from "../constants/actionTypes";

const categoryReducer = (category = [], action) => {
  switch (action.type) {
    case FETCH_CATEGORY:
      return action.payload;

    case FETCH_CATEGORY_ID:
      return [action.payload];

    default:
      return category;
  }
};

export default categoryReducer;
