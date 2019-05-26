import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { rootReducer } from '../dux';
// import { afterInitStoreDux } from '../dux/afterInitStoreDux';
import { IAppState } from '../dux/duxRoot';
import { middlewares } from './middlewares';

const storeCreator = (initialState?: IAppState): Store<IAppState> => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
  // store.dispatch(afterInitStoreDux());
  return store;
};

export default storeCreator();
