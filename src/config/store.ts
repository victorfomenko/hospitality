import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { rootReducer } from '../dux';
import { IAppState } from '../dux/duxRoot';
import { middlewares } from './middlewares';

const storeCreator = (): Store<IAppState> => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );

  return store;
};

export default storeCreator();
