import storage from 'local-storage-fallback';
import qs from 'qs';
import { createAction, createReducer } from 'redux-act';
import { createSelector } from 'reselect';
import {
  CATEGORIES_KEY,
  CHATBOT_KEY,
  PLACE_COLLECTION_KEY,
} from '../../data/constants';
import { DispatchAsync, IAppState } from '../duxRoot';
import {
  getGalleryById,
  getPlaceCollectionById,
  IGalleryRes,
  IPlaceCollection,
} from './initApi';

const getCollectionId = () => {
  const { search } = window.location;
  const { placeCollectionId, ...queryParams } = qs.parse(search, {
    ignoreQueryPrefix: true,
  });
  let id = placeCollectionId || null;
  if (placeCollectionId) {
    const oldId = storage.getItem(PLACE_COLLECTION_KEY);
    // remove existing data if collection id has been changed
    if (oldId !== id) {
      storage.removeItem(CHATBOT_KEY);
      storage.removeItem(CATEGORIES_KEY);
    }
    storage.setItem(PLACE_COLLECTION_KEY, id);
    window.location.search = `${qs.stringify(queryParams, {
      addQueryPrefix: Object.keys(queryParams).length ? true : false,
    })}`;
  } else {
    id = storage.getItem(PLACE_COLLECTION_KEY);
  }
  return id ? id : false;
};

// Interface
export interface IInitState {
  placeCollectionId: string | null | false;
  error: {} | null;
  isLoading: boolean;
  collection: null | IPlaceCollection;
  gallery: null | IGalleryRes;
}

interface ISuccess {
  collection: IPlaceCollection;
  gallery: IGalleryRes;
}

// Default state
const defaultState: IInitState = {
  placeCollectionId: null,
  error: null,
  isLoading: false,
  collection: null,
  gallery: null,
};

// Selectors
const duxSelector = (state: IAppState) => state.init;

// Sync actions
export const loading = createAction('loading');
export const success = createAction<ISuccess>('success');
export const error = createAction<{}>('error');
export const setCollectionId = createAction<string>('setCollectionId');

// Async actions
export const apiInit = () => async (dispatch: DispatchAsync) => {
  const collectionId = getCollectionId();
  dispatch(setCollectionId(collectionId));
  if (!collectionId) {
    return;
  }
  dispatch(loading());
  try {
    const { placeCollection } = await getPlaceCollectionById(collectionId!);
    const gallery = await getGalleryById('5b03c01c951f0c114344f74e');
    dispatch(success({ collection: placeCollection, gallery }));
  } catch (e) {
    dispatch(error(e));
  }
};

export const loadingSelector = createSelector(
  duxSelector,
  ({ isLoading }) => isLoading,
);

export const gallerySelector = createSelector(
  duxSelector,
  ({ gallery }) => gallery,
);

export const collectionSelector = createSelector(
  duxSelector,
  ({ collection }) => collection,
);

export const categoriesSelector = createSelector(
  collectionSelector,
  collection => (collection ? collection.places.map(item => item.type) : null),
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

    [success.toString()]: (state: IInitState, { ...data }) => ({
      ...state,
      ...data,
      isLoading: false,
    }),

    [loading.toString()]: (state: IInitState) => ({
      ...state,
      isLoading: true,
    }),

    [error.toString()]: (state: IInitState, payload) => ({
      ...state,
      error: payload,
      isLoading: false,
    }),
  },
  defaultState,
);
