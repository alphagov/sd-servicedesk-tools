import axios from 'axios';

import { NEW_START_TICKETS_PENDING } from './types';

export const fetchNewsStartsPending = () => async dispatch => {
  const newPending = await axios.get('/api/whd/tickets/newstart/pending');
  //   console.log(newPending.data);
  dispatch({ type: NEW_START_TICKETS_PENDING, payload: newPending.data });
};
