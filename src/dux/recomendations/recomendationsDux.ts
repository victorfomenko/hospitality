import { createAction, createReducer } from 'redux-act';
import { createSelector } from 'reselect';
import { IAppState } from '../duxRoot';

// Interface
export interface IRecomendationsState {
  isLoading: boolean;
  placeCollectionId: number | null;
}

// Default state
const defaultState: IRecomendationsState = {
  isLoading: false,
  placeCollectionId: null,
};

// Selectors
const duxSelector = (state: IAppState) => state.recomendations;

export const isDashboardLoadingSelector = createSelector(
  duxSelector,
  ({ isLoading }) => isLoading,
);

// Sync actions
export const loading = createAction('loading');

// Reducer
export const recomendationsReducer = createReducer(
  {
    [loading.toString()]: (state: IRecomendationsState) => ({
      ...state,
      isLoading: true,
    }),
  },
  defaultState,
);
