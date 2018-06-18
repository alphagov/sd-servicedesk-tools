import axios from 'axios';

import {
  NEW_START_TICKETS_PENDING,
  CLEAR_START_TICKETS_PENDING
} from './types';

export const fetchNewsStartsPending = () => async dispatch => {
  dispatch({ type: CLEAR_START_TICKETS_PENDING });
  // clear the store first....good case for some redux middleware here
  const res = await axios.get('/api/whd/tickets/newstart/pending');
  // mmmmm....not enough info in the ticket.....I think I need to consider
  // 2 things:
  // 1: iterate over the data and get the full tickets
  // 2: use graphql (fave solution) but need to learn a bit more on token/apikey
  for (let x in res.data) {
    dispatch(fetchTicketDetails(res.data[x].id));
  }
};

export const fetchTicketDetails = id => async dispatch => {
  const res = await axios.get(`/api/whd/tickets/${id}`);
  dispatch({ type: NEW_START_TICKETS_PENDING, payload: res.data });
};
