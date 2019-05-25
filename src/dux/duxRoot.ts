import { combineReducers } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  IRecomendationsState,
  recomendationsReducer as recomendations,
} from './recomendations/recomendationsDux';

export type DispatchAsync = ThunkDispatch<IAppState, null, any>;

export interface IAppState {
  recomendations: IRecomendationsState;
}

export const rootReducer = combineReducers<IAppState>({
  recomendations,
});
