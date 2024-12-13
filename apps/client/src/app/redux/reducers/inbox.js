import { CREATE_INBOX, FETCH_INBOX } from "../constants/actionTypes";

const inboxReducer = (inbox = [], action) => {
  switch (action.type) {
    case FETCH_INBOX:
      return action.payload;

    case CREATE_INBOX:
      return [...inbox, action.payload];

    default:
      return inbox;
  }
};

export default inboxReducer;
