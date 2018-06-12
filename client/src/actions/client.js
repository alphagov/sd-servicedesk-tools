import axios from 'axios';
import {
  SEARCH_CLIENTS,
  FETCH_CLIENT,
  CLEAR_CLIENT,
  FETCH_ASSET_CLIENTS,
  CLEAR_ASSET_CLIENTS
} from './types';

export const searchClient = terms => async dispatch => {
  const res = await axios.get('/api/whd/clients/search', {
    params: {
      searchTerm: terms
    }
  });
  dispatch({ type: SEARCH_CLIENTS, payload: res.data });
};

export const fetchClient = id => async dispatch => {
  const res = await axios.get(`/api/whd/clients/${id}`);
  dispatch({ type: FETCH_CLIENT, payload: res.data });
};

export const clearClient = () => dispatch => {
  dispatch({ type: CLEAR_CLIENT });
};

export const fetchAssetClients = (clientId, assetId) => async dispatch => {
  const res = await axios.get(`/api/whd/clients/${clientId}`);
  res.data.assetId = assetId;
  dispatch({ type: FETCH_ASSET_CLIENTS, payload: res.data });
};

export const clearAssetClients = () => dispatch => {
  dispatch({ type: CLEAR_ASSET_CLIENTS });
};
