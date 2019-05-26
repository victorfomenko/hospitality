import { createAction, Dispatch } from 'redux-act';

export const clearAll = createAction('clearAll');
export const catch401 = createAction('catch401');
export const catch500 = createAction('catch500');

export const afterInitStoreDux = () => (dispatch: Dispatch) => {
  const { location } = window;
  // dispatch(loadUser());
};
