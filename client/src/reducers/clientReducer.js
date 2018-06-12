import {
  SEARCH_CLIENTS,
  FETCH_CLIENT,
  CLEAR_CLIENT,
  FETCH_ASSET_CLIENTS,
  CLEAR_ASSET_CLIENTS,
  CLEAR_SEARCH_CLIENTS
} from '../actions/types';

const INITIAL_STATE_A = [];
const INITIAL_STATE_O = {};

export const searchClientReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case SEARCH_CLIENTS:
      return action.payload;
    case CLEAR_SEARCH_CLIENTS:
      return INITIAL_STATE_A;
    default:
      return state;
  }
};

export const fetchClientReducer = (state = INITIAL_STATE_O, action) => {
  switch (action.type) {
    case FETCH_CLIENT:
      return action.payload;
    case CLEAR_CLIENT:
      return INITIAL_STATE_O;
    default:
      return state;
  }
};

export const fetchAssetClientsReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case FETCH_ASSET_CLIENTS:
      return [...state, action.payload];
    case CLEAR_ASSET_CLIENTS:
      return INITIAL_STATE_A;
    default:
      return state;
  }
};
