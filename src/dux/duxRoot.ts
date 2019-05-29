import { combineReducers } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { chatbotReducer as chatbot, IChatbotState } from './chatbot/chatbotDux';
import { IInitState, initReducer as init } from './init/initDux';
import {
  IRecomendationsState,
  recomendationsReducer as recomendations,
} from './recomendations/recomendationsDux';

export type DispatchAsync = ThunkDispatch<IAppState, null, any>;

export interface IAppState {
  chatbot: IChatbotState;
  recomendations: IRecomendationsState;
  init: IInitState;
}

export const rootReducer = combineReducers<IAppState>({
  init,
  chatbot,
  recomendations,
});
