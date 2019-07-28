import { createAction, createReducer } from 'redux-act';
import { createSelector } from 'reselect';
import { DispatchAsync, IAppState } from '../duxRoot';
import { placeCollectionIdSelector } from '../init/initDux';
import { getPlaceDetailsById, IDetailsMap } from './placesApi';

// Interface
export interface IPlacesState {
  isLoading: boolean;
  details: IDetailsMap;
  placeCollectionId: number | null;
}

// Default state
const defaultState: IPlacesState = {
  isLoading: false,
  details: {},
  placeCollectionId: null,
};

// Selectors
const duxSelector = (state: IAppState) => state.places;
const idSelector = (_: any, props: { id: string }) => props.id;

export const isDashboardLoadingSelector = createSelector(
  duxSelector,
  ({ isLoading }) => isLoading,
);

export const detailsByIdSelector = createSelector(
  duxSelector,
  idSelector,
  (item, id) => item.details[id],
);

export const detailsSelector = createSelector(
  duxSelector,
  ({ details }) => details,
);

// Sync actions
export const loading = createAction('loading');
export const success = createAction<IDetailsMap>('success');
export const error = createAction<{}>('error');

// Async actions
export const getDetails = (ids: string[]) => async (
  dispatch: DispatchAsync,
  getState: () => IAppState,
) => {
  const collectionId = placeCollectionIdSelector(getState());
  if (!collectionId) {
    return;
  }
  dispatch(loading());
  try {
    const { places } = await getPlaceDetailsById(collectionId, {
      params: { places: ids },
    });
    const details = places.reduce(
      (acc, item) => {
        const placeId = item.id;
        if (!acc[placeId]) {
          acc[placeId] = item.details;
        }
        return acc;
      },
      {} as IDetailsMap,
    );
    dispatch(success(details));
  } catch (e) {
    dispatch(error(e));
  }
};

// Reducer
export const placesReducer = createReducer(
  {
    [loading.toString()]: (state: IPlacesState) => ({
      ...state,
      isLoading: true,
    }),
    [success.toString()]: (state: IPlacesState, payload) => ({
      ...state,
      details: {
        ...state.details,
        ...payload,
      },
      isLoading: false,
    }),
    [error.toString()]: (state: IPlacesState, payload) => ({
      ...state,
      error: payload,
      isLoading: false,
    }),
  },
  defaultState,
);
