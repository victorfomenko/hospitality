import { combineReducers } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  categoriesReducer as categories,
  ICategoriesState,
} from './categories/categoriesDux';
import { chatbotReducer as chatbot, IChatbotState } from './chatbot/chatbotDux';
import { IInitState, initReducer as init } from './init/initDux';

import { IPlacesState, placesReducer as places } from './places/placesDux';

export type DispatchAsync = ThunkDispatch<IAppState, null, any>;

export interface IAppState {
  init: IInitState;
  chatbot: IChatbotState;
  categories: ICategoriesState;
  places: IPlacesState;
}

export const rootReducer = combineReducers<IAppState>({
  init,
  chatbot,
  categories,
  places,
});
