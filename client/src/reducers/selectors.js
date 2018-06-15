import { createSelector } from 'reselect';
import _ from 'lodash';

// techs
export const selectTechDetails = state => state.auth;

//  ************ assets
export const selectAssetsStatus = state => state.assetsStatus;
export const selectAssetSearchResult = state => state.assetDetails;
export const selectAssetLocations = state => state.assetLocations;
export const selectAssetRooms = state => state.assetRooms;

export const selectAssetSearchResultName = createSelector(
  selectAssetSearchResult,
  asset => {
    if (!_.isEmpty(asset)) {
      let assO = {
        title: `${asset.assetNumber}`,
        key: asset.id
      };
      let assA = [];
      return [...assA, assO];
    } else return [];
  }
);

// export const selectAssetWithStatusName = createSelector(
//   selectAssetsStatus,
//   selectAssetSearchResult,
//   (status, asset) => {
//     let assObjStat = asset.assetstatus;
//     let assTats = _.find(status, { id: assObjStat.id });
//     return assTats;
//   }
// );

//  ************** clients
export const selectClientSearchResults = state => state.clients;
export const selectClientsResultsNames = createSelector(
  selectClientSearchResults,
  clients => {
    return clients.map(client => {
      return {
        title: `${client.firstName} ${client.lastName}`,
        email: client.email,
        key: client.id
      };
    });
  }
);

export const selectAssetClients = state => state.assetClients;

//  ***************** client
export const selectClient = state => state.client;
export const selectClientAssets = state => state.clientAssets;

// add the status to the client asset
export const selectClientAssetsWithStatus = createSelector(
  selectClientAssets,
  selectAssetsStatus,
  (clientAssets, assetStatuses) => {
    return _.map(clientAssets, obj => {
      let newObj = obj.assetstatus;
      let assTat = _.assign(newObj, _.find(assetStatuses, { id: newObj.id }));
      return assTat;
    });
  }
);

//  ******************************** TICKETS

export const selectNewStartTicketsPending = state => state.newStartPending;
