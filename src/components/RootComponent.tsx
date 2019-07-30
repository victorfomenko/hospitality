import React from 'react';
import { Provider } from 'react-redux';
import store from '../config/store';
import RootRouter from './RootRouter';
import ThemeProviders from './ThemeProviders';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProviders>
        <RootRouter />
      </ThemeProviders>
    </Provider>
  );
};

export default App;
