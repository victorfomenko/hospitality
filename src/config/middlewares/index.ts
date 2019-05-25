import { createPromise } from 'redux-promise-middleware';
import thunk from 'redux-thunk';

// Спиок мидлвар
export const middlewares = [
  thunk,
  createPromise({
    promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR'],
  }),
];

// logger для девелопа
if (process.env.NODE_ENV !== 'production') {
  if (typeof window === 'object') {
    // tslint:disable-next-line
    const { createLogger } = require('redux-logger');
    middlewares.push(createLogger({ collapsed: true }));
  }
}
