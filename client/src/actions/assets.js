import axios from 'axios';

import {
  CLEAR_CLIENT_ASSETS,
  SEARCH_ASSETS,
  CLEAR_SEARCH_ASSETS,
  FETCH_ASSET_STATUS,
  ADD_CLIENT_ASSET,
  UPDATE_ASSET_STATUS_CLIENT,
  UNASSIGN_CLIENT_ASSET,
  UPDATE_ASSET_CLIENTS,
  UPDATE_ASSET_STATUS_ASSET,
  FETCH_ASSET_LOCATIONS,
  UPDATE_ASSET_RESV_ASSET,
  FETCH_ASSET_ROOMS,
  UPDATE_ASSET_ROOMS_ASSET
} from './types';

export const fetchClientAssets = username => async dispatch => {
  const assetList = await axios.get('/api/whd/client/assets', {
    params: {
      userName: username
    }
  });

  // this does not return full asset details.......
  // we need to iterate through all the returned and then
  // make a separate rest req for each asset......grrrrrrrrr
  if (assetList.data.length > 0) {
    let assetIds = assetList.data.map(asset => asset.id);
    for (let s of assetIds) {
      dispatch(addAssetDetail(s, true));
    }
  }
};

export const addAssetDetail = (assetId, client) => async dispatch => {
  const assetListFull = await axios.get('/api/whd/assets', {
    params: {
      assetId: assetId
    }
  });
  if (client) {
    dispatch({
      type: ADD_CLIENT_ASSET,
      payload: assetListFull.data
    });
  } else {
    dispatch({ type: SEARCH_ASSETS, payload: assetListFull.data });
  }
};

export const clearClientAssets = () => dispatch => {
  dispatch({ type: CLEAR_CLIENT_ASSETS });
};

export const searchAssets = terms => async dispatch => {
  const res = await axios.get('/api/whd/assets/search', {
    params: {
      searchTerm: terms
    }
  });

  if (res.data.length > 0) {
    let assetIds = res.data.map(asset => asset.id);
    for (let s of assetIds) {
      dispatch(addAssetDetail(s, false));
    }
  }
};

export const clearSearchAssets = () => dispatch => {
  dispatch({ type: CLEAR_SEARCH_ASSETS });
};

export const fetchAssetRooms = () => async dispatch => {
  const assetRooms = await axios.get('/api/whd/assets/rooms');
  dispatch({ type: FETCH_ASSET_ROOMS, payload: assetRooms.data });
};

export const updateAssetRooms = newroom => async dispatch => {
  const newRoomy = await axios.post('/api/whd/assets/rooms', newroom);
  if (newRoomy.status === 200) {
    const { id, type, roomName } = newroom;
    dispatch({
      type: UPDATE_ASSET_ROOMS_ASSET,
      payload: { id, type, roomName }
    });
  }
};

export const fetchAssetLocations = () => dispatch => {
  axios
    .get('/api/whd/assets/locations')
    .then(response => {
      dispatch({ type: FETCH_ASSET_LOCATIONS, payload: response.data });
    })
    .catch(error => {
      if (error.response.status === 401) {
        return error.response.status;
      } else {
        console.error(error);
      }
    });
};

export const updateAssetReservable = newres => async dispatch => {
  const newRessy = await axios.put('/api/whd/asset/reservable', newres);
  if (newRessy.status === 200) {
    dispatch({ type: UPDATE_ASSET_RESV_ASSET, payload: newres.isRes });
  }
};

export const updateAssetLocation = newloc => dispatch => {
  axios
    .post('/api/whd/asset/location', newloc)
    .then(res => {
      // update redux with new address/pulls down new client
      dispatch(searchAssets(res.data.assetNumber));
    })
    .catch(error => console.log(error));
};

export const fetchAssetStatus = () => async dispatch => {
  const res = await axios.get('/api/whd/assets/status');
  dispatch({ type: FETCH_ASSET_STATUS, payload: res.data });
};

export const updateAssetStatus = (asset, fromC) => async dispatch => {
  const res = await axios.put('/api/whd/asset/status', {
    data: {
      assetId: asset.assetId,
      statusId: asset.statusId,
      statusName: asset.statusName
    }
  });
  // update whd

  if (res.status === 200) {
    switch (fromC) {
      case true:
        dispatch({ type: UPDATE_ASSET_STATUS_CLIENT, payload: asset });
        break;
      default:
        let newStat = {
          id: asset.statusId,
          type: 'AssetStatus'
        };
        dispatch({ type: UPDATE_ASSET_STATUS_ASSET, payload: newStat });
    }
  } else {
    console.error('Unable to update the Asset Status', res.data);
  }
};

export const updateAssetClient = (assetid, client, fromC) => async dispatch => {
  const res = await axios.put('/api/whd/asset/client', {
    data: {
      assetId: assetid,
      client: client
    }
  });

  if (res.data.status === 200) {
    switch (fromC) {
      case true:
        // this will only work for client assets
        dispatch({ type: UNASSIGN_CLIENT_ASSET, payload: assetid });
        break;
      default:
        dispatch({ type: UPDATE_ASSET_CLIENTS, payload: client });
    }
  } else {
    console.error('Unable to update the Asset Clients', res.data);
    // need to send a message about this..............
  }
};
