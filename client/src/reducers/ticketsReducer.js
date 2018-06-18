import {
  NEW_START_TICKETS_PENDING,
  FETCH_TICKET_DETAILS
} from '../actions/types';

const INITIAL_STATE_A = [];
const INITIAL_STATE_O = {};

export const newStartPendingReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case NEW_START_TICKETS_PENDING:
      return action.payload;

    default:
      return state;
  }
};

export const ticketReducer = (state = INITIAL_STATE_O, action) => {
  switch (action.type) {
    case FETCH_TICKET_DETAILS:
      return action.payload;

    default:
      return state;
  }
};
