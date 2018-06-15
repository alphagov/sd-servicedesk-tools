import { NEW_START_TICKETS_PENDING } from '../actions/types';

const INITIAL_STATE_A = [];

export const newStartPendingReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case NEW_START_TICKETS_PENDING:
      return action.payload;

    default:
      return state;
  }
};
