import axios from 'axios';
import { FETCH_TICKET_DETAILS } from './types';

export const fetchTicketDetails = id => async dispatch => {
  const res = await axios.get(`/api/whd/tickets/${id}`);
  dispatch({ type: FETCH_TICKET_DETAILS, payload: res.data });
};
