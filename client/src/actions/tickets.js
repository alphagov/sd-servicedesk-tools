import axios from 'axios';
import { FETCH_TICKET_DETAILS, CLEAR_TICKET_DETAILS } from './types';

export const fetchTicketDetails = id => async dispatch => {
  // clear the state just in case........
  dispatch({ type: CLEAR_TICKET_DETAILS });
  const res = await axios.get(`/api/whd/tickets/${id}`);
  dispatch({ type: FETCH_TICKET_DETAILS, payload: res.data });
};
