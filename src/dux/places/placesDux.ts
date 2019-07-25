import { createAction, createReducer } from 'redux-act';
import { createSelector } from 'reselect';
import { DispatchAsync, IAppState } from '../duxRoot';
import { IInitState, placeCollectionIdSelector } from '../init/initDux';
import { getPlaceDetailsById, IPlaceDetails } from './placesApi';

// Interface
export interface IPlacesState {
  isLoading: boolean;
  details: IPlaceDetails;
  placeCollectionId: number | null;
}

// Default state
const defaultState: IPlacesState = {
  isLoading: false,
  details: {},
  placeCollectionId: null,
};
interface ISuccess {
  details: IPlaceDetails;
}

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
export const success = createAction<ISuccess>('success');
export const error = createAction<{}>('error');

// Async actions
export const getDetails = (id: string) => async (
  dispatch: DispatchAsync,
  getState: () => IAppState,
) => {
  const collectionId = placeCollectionIdSelector(getState());
  if (!collectionId) {
    return;
  }
  dispatch(loading());
  try {
    const { details } = await getPlaceDetailsById(collectionId, id);
    // console.log(details);
    dispatch(success({ details }));
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
    [success.toString()]: (state: IInitState, { ...data }) => ({
      ...state,
      ...data,
      isLoading: false,
    }),
    [error.toString()]: (state: IInitState, payload) => ({
      ...state,
      error: payload,
      isLoading: false,
    }),
  },
  defaultState,
);
