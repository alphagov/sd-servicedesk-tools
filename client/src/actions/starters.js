import axios from 'axios';

import {
  NEW_START_TICKETS_PENDING,
  NEW_START_TICKETS_GDS,
  CLEAR_START_TICKETS_GDS,
  CLEAR_START_TICKETS_PENDING
} from './types';

export const fetchNewsStartsPending = () => async (dispatch) => {
  dispatch({ type: CLEAR_START_TICKETS_PENDING });
  // clear the store first....good case for some redux middleware here
  const res = await axios.get('/api/whd/tickets/newstart/pending');
  // mmmmm....not enough info in the ticket.....I think I need to consider
  // 2 things:
  // 1: iterate over the data and get the full tickets
  // 2: use graphql (fave solution) but need to learn a bit more on token/apikey

  dispatch({ type: NEW_START_TICKETS_PENDING, payload: res.data });
};

// this is messy need some redux middleware

export const fetchTicketDetailsPending = (id) => async (dispatch) => {
  const res = await axios.get(`/api/whd/tickets/${id}`);
  dispatch({ type: NEW_START_TICKETS_PENDING, payload: res.data });
};

export const fetchTicketDetailsGDS = (id) => async (dispatch) => {
  const res = await axios.get(`/api/whd/tickets/${id}`);
  // add into contractors here
  // nope we really need some redux middleware
  dispatch({ type: NEW_START_TICKETS_GDS, payload: res.data });
};

export const fetchNewStartsApprovedGDS = () => async (dispatch) => {
  dispatch({ type: CLEAR_START_TICKETS_GDS });

  const res = await axios.get('/api/whd/tickets/newstart/gds');

  dispatch({ type: NEW_START_TICKETS_GDS, payload: res.data });
};
