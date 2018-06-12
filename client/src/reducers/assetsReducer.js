import {
  FETCH_CLIENT_ASSETS,
  CLEAR_CLIENT_ASSETS,
  SEARCH_ASSETS,
  CLEAR_SEARCH_ASSETS,
  FETCH_ASSET_STATUS,
  ADD_CLIENT_ASSET,
  UPDATE_ASSET_STATUS_CLIENT,
  UPDATE_ASSET_STATUS_ASSET,
  UNASSIGN_CLIENT_ASSET,
  UPDATE_ASSET_CLIENTS,
  FETCH_ASSET_LOCATIONS,
  UPDATE_ASSET_RESV_ASSET,
  FETCH_ASSET_ROOMS,
  UPDATE_ASSET_ROOMS_ASSET
} from '../actions/types';

const INITIAL_STATE_A = [];
const INITIAL_STATE_O = {};

export const clientAssetsReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case FETCH_CLIENT_ASSETS:
      return action.payload;
    case CLEAR_CLIENT_ASSETS:
      return INITIAL_STATE_A;
    case ADD_CLIENT_ASSET:
      return [...state, action.payload];
    case UPDATE_ASSET_STATUS_CLIENT:
      const { assetId, statusId, statusName } = action.payload;
      return state.map(asset => {
        if (asset.id === assetId) {
          asset.assetstatus.id = statusId;
          asset.assetstatus.name = statusName;
        }
        return asset;
      });
    case UNASSIGN_CLIENT_ASSET:
      return state.filter(asset => asset.id !== action.payload);
    default:
      return state;
  }
};

export const searchAssetsReducer = (state = INITIAL_STATE_O, action) => {
  switch (action.type) {
    case SEARCH_ASSETS:
      return action.payload;
    case CLEAR_SEARCH_ASSETS:
      return INITIAL_STATE_O;
    case UPDATE_ASSET_CLIENTS:
      return { ...state, clients: action.payload };
    case UPDATE_ASSET_STATUS_ASSET:
      return { ...state, assetstatus: action.payload };
    case UPDATE_ASSET_RESV_ASSET:
      return { ...state, isReservable: action.payload };
    case UPDATE_ASSET_ROOMS_ASSET:
      return { ...state, room: action.payload };
    default:
      return state;
  }
};

export const assetStatusReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case FETCH_ASSET_STATUS:
      return action.payload;
    default:
      return state;
  }
};

export const assetLocationsReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case FETCH_ASSET_LOCATIONS:
      return action.payload;
    default:
      return state;
  }
};

export const assetRoomsReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case FETCH_ASSET_ROOMS:
      return action.payload;
    default:
      return state;
  }
};
