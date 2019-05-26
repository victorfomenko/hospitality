import { combineReducers } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IInitState, initReducer as init } from './init/initDux';
import {
  IRecomendationsState,
  recomendationsReducer as recomendations,
} from './recomendations/recomendationsDux';

export type DispatchAsync = ThunkDispatch<IAppState, null, any>;

export interface IAppState {
  recomendations: IRecomendationsState;
  init: IInitState;
}

export const rootReducer = combineReducers<IAppState>({
  init,
  recomendations,
});
