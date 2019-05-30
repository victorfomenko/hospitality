import { createBrowserHistory } from 'history';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { IAppState } from '../dux/duxRoot';
import * as initDux from '../dux/init/initDux';
import CategoriesPage from '../modules/categories';
import ChatbotPage from '../modules/chatbot';
import NotFoundPage from '../modules/notFound';
import PlacesPage from '../modules/places';
import RecomendationsPage from '../modules/recomendations';
import WelcomePage from '../modules/welcome';
import Layout from './Layout';

export const history = createBrowserHistory();

interface IRootRouterProps {
  collectionId: string | null | false;
  apiInit: () => void;
}

const RootRouter = (props: IRootRouterProps) => {
  const { collectionId, apiInit } = props;
  useEffect(() => {
    apiInit();
  }, [apiInit]);

  return (
    <>
      {collectionId && (
        <Router history={history}>
          <Layout>
            <Switch>
              <Redirect from="/" exact={true} to="/welcome" />
              <Route path="/welcome" component={WelcomePage} />
              <Route path="/recomendations" component={RecomendationsPage} />
              <Route path="/chatbot" component={ChatbotPage} />
              <Route path="/categories" component={CategoriesPage} />
              <Route path="/places" component={PlacesPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Layout>
        </Router>
      )}
      {collectionId === false && (
        <div>
          Please input collection id in query string. For example:
          ?placeCollectionId=2
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = {
  apiInit: initDux.apiInit,
};
const mapStateToProps = (state: IAppState) => ({
  collectionId: initDux.placeCollectionIdSelector(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootRouter);
