import { createAction, createReducer } from 'redux-act';
import { createSelector } from 'reselect';
import { IAppState } from '../duxRoot';

// Interface
export interface ICategoriesState {
  categories: [] | null;
}

// Default state
const defaultState: ICategoriesState = {
  categories: null,
};

// Selectors
const duxSelector = (state: IAppState) => state.categories;

export const categoriesSelector = createSelector(
  duxSelector,
  ({ categories }) => categories,
);

// Sync actions
export const change = createAction('change');

// Reducer
export const categoriesReducer = createReducer(
  {
    [change.toString()]: (state: ICategoriesState, payload) => ({
      ...state,
      categories: payload,
    }),
  },
  defaultState,
);
