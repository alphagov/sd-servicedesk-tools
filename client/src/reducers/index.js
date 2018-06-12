import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import authReducer from './authReducer';
import {
  searchClientReducer,
  fetchClientReducer,
  fetchAssetClientsReducer
} from './clientReducer';
import {
  clientAssetsReducer,
  searchAssetsReducer,
  assetStatusReducer,
  assetLocationsReducer,
  assetRoomsReducer
} from './assetsReducer';

const reducer = combineReducers({
  auth: authReducer,
  clients: searchClientReducer,
  client: fetchClientReducer,
  clientAssets: clientAssetsReducer,
  assetDetails: searchAssetsReducer,
  assetsStatus: assetStatusReducer,
  assetClients: fetchAssetClientsReducer,
  assetLocations: assetLocationsReducer,
  assetRooms: assetRoomsReducer,
  form: reduxForm
});

export default reducer;
