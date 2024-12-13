import {
  FETCH_INBOX,
  FETCH_INBOX_ID,
  DELETE_INBOX,
} from "../constants/actionTypes";

const inboxReducer = (inbox = [], action) => {
  switch (action.type) {
    case FETCH_INBOX:
      return action.payload;

    case FETCH_INBOX_ID:
      return [action.payload];

    case DELETE_INBOX:
      return inbox.filter((item) => item._id !== action.payload._id);

    default:
      return inbox;
  }
};

export default inboxReducer;
