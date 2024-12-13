import { FETCH_STATUS } from "../constants/actionTypes";

const statusReducer = (status = [], action) => {
  switch (action.type) {
    case FETCH_STATUS:
      return action.payload;
    default:
      return status;
  }
};

export default statusReducer;
