import { createAction, createReducer } from 'redux-act';
import { createSelector } from 'reselect';
import { IAppState } from '../duxRoot';

// Interface
export interface IChatbotState {
  isLoading: boolean;
}

export interface IChatbotMessage {
  type: string;
  data: {
    id: string;
    parentId: string;
    content: string;
    name: string;
    type: string;
    useMainCta: boolean;
    ctaUrl: boolean;
    customAttributes: object;
  };
}

// Default state
const defaultState: IChatbotState = {
  isLoading: false,
};

// Selectors
const duxSelector = (state: IAppState) => state.chatbot;

export const loadingSelector = createSelector(
  duxSelector,
  ({ isLoading }) => isLoading,
);

// Sync actions
export const loading = createAction('loading');
export const success = createAction('success');
export const change = createAction<IChatbotMessage>('change');

// Reducer
export const chatbotReducer = createReducer(
  {
    [loading.toString()]: (state: IChatbotState) => ({
      ...state,
      isLoading: true,
    }),
    [success.toString()]: (state: IChatbotState) => ({
      ...state,
      isLoading: false,
    }),
    [change.toString()]: (state: IChatbotState, payload) => ({
      ...state,
      data: payload,
    }),
  },
  defaultState,
);