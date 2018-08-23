import {
  NEW_START_TICKETS_PENDING,
  FETCH_TICKET_DETAILS,
  CLEAR_START_TICKETS_PENDING,
  CLEAR_START_TICKETS_GDS,
  NEW_START_TICKETS_GDS,
  CLEAR_TICKET_DETAILS
} from '../actions/types';

const INITIAL_STATE_A = [];
const INITIAL_STATE_O = {};

export const newStartPendingReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case NEW_START_TICKETS_PENDING:
      return action.payload;

    case CLEAR_START_TICKETS_PENDING:
      return INITIAL_STATE_A;

    default:
      return state;
  }
};

export const newStartGDSReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case NEW_START_TICKETS_GDS:
      return action.payload;

    case CLEAR_START_TICKETS_GDS:
      return INITIAL_STATE_A;

    default:
      return state;
  }
};

export const ticketReducer = (state = INITIAL_STATE_O, action) => {
  switch (action.type) {
    case CLEAR_TICKET_DETAILS:
      return INITIAL_STATE_O;

    case FETCH_TICKET_DETAILS:
      return action.payload;

    default:
      return state;
  }
};
