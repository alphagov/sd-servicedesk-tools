import { createSelector } from 'reselect';
import _ from 'lodash';

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
