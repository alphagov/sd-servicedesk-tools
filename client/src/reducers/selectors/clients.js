import { createSelector } from 'reselect';
import _ from 'lodash';

import { selectAssetsStatus } from './assets';

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
