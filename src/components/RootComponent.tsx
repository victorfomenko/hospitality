import createBrowserHistory from 'history/createBrowserHistory';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import store from '../config/store';
import CustomizationsPage from '../modules/customizations';
import NotFoundPage from '../modules/notFound';
import PlacesPage from '../modules/places';

export const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact={true} component={CustomizationsPage} />
          <Route path="/places" exact={true} component={PlacesPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
