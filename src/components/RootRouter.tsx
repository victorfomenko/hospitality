import { createBrowserHistory } from 'history';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import CustomizationsPage from '../modules/customizations';
import NotFoundPage from '../modules/notFound';
import PlacesPage from '../modules/places';

export const history = createBrowserHistory();

const RootRouter = () => (
  <Router history={history}>
    <Switch>
      <Route path="/" exact={true} component={CustomizationsPage} />
      <Route path="/places" exact={true} component={PlacesPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default RootRouter;
