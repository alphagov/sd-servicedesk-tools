import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export const middlewares = [ReduxThunk];

const createStoreWithMiddleware = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export default createStoreWithMiddleware;
