import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { rootReducer } from '../dux';
import { IAppState } from '../dux/duxRoot';
import { afterInitStore } from '../dux/init/initDux';
import { middlewares } from './middlewares';

const storeCreator = (initialState?: IAppState): Store<IAppState> => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
  store.dispatch(afterInitStore() as any);
  return store;
};

export default storeCreator();
