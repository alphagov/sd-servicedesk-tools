import axios from 'axios';

import { FETCH_WCH_EVENTS } from './types';

export const fetchWCHEvents = () => async (dispatch) => {
  const wchEvents = await axios.get('/api/whd/tickets/events/wch');
  console.log(wchEvents.data);
  //   dispatch({ type: FETCH_WCH_EVENTS, payload: wchEvents.data });
};
