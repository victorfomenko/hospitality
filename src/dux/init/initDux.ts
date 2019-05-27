import storage from 'local-storage-fallback';
import qs from 'qs';
import { createAction, createReducer } from 'redux-act';
import { createSelector } from 'reselect';
import { PLACE_COLLECTION_KEY } from '../../data/constants';
import { DispatchAsync, IAppState } from '../duxRoot';

export const afterInitStore = () => (dispatch: DispatchAsync) => {
  const { search } = window.location;
  const { placeCollectionId, ...queryParams } = qs.parse(search, {
    ignoreQueryPrefix: true,
  });
  let id = placeCollectionId || null;
  if (placeCollectionId) {
    storage.setItem(PLACE_COLLECTION_KEY, id);
    window.location.search = `${qs.stringify(queryParams, {
      addQueryPrefix: Object.keys(queryParams).length ? true : false,
    })}`;
  } else {
    id = storage.getItem(PLACE_COLLECTION_KEY);
  }

  dispatch(setCollectionId(id));
};

// Interface
export interface IInitState {
  placeCollectionId: number | null;
  isLoading: boolean;
}

// Default state
const defaultState: IInitState = {
  placeCollectionId: null,
  isLoading: false,
};

// Selectors
const duxSelector = (state: IAppState) => state.init;

// Sync actions
export const loading = createAction('loading');
export const setCollectionId = createAction<string>('setCollectionId');

export const loadingSelector = createSelector(
  duxSelector,
  ({ isLoading }) => isLoading,
);

export const placeCollectionIdSelector = createSelector(
  duxSelector,
  ({ placeCollectionId }) => placeCollectionId,
);

// Reducer
export const initReducer = createReducer(
  {
    [setCollectionId.toString()]: (state: IInitState, payload) => ({
      ...state,
      placeCollectionId: payload,
    }),
  },
  defaultState,
);
