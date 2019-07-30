import qs from 'qs';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../config/store';
import RootRouter from './RootRouter';
import ThemeProviders from './ThemeProviders';

const GA_DISABLE_KEY: string = `ga-disable-${
  process.env.REACT_APP_GA_MEASUREMENT_ID
}`;

const App: React.FC = () => {
  const { search } = window.location;
  const { gaDisable } = qs.parse(search, { ignoreQueryPrefix: true });
  // disable GA if not production
  if (process.env.NODE_ENV !== 'production' || gaDisable === '1') {
    (window as any)[GA_DISABLE_KEY] = true;
  }
  return (
    <Provider store={store}>
      <ThemeProviders>
        <RootRouter />
      </ThemeProviders>
    </Provider>
  );
};

export default App;
