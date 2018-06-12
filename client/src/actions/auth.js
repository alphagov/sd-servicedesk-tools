import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchTech = () => async dispatch => {
  const res = await axios.get('/api/whd/current_tech');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const loginTech = values => async dispatch => {
  await axios.get('/auth/whd/', {
    params: {
      username: values.username,
      password: values.password,
    },
  });
  // get the current user......
  dispatch(fetchTech());
};

export const enrolWHDTech = tech => async dispatch => {
  await axios.post('/api/whd/enrol_tech', tech);
  dispatch(fetchTech());
};
