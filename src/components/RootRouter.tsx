import { createBrowserHistory } from 'history';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { IAppState } from '../dux/duxRoot';
import * as initDux from '../dux/init/initDux';
import ChatbotPage from '../modules/chatbot';
import MoodPage from '../modules/mood';
import NotFoundPage from '../modules/notFound';
import PlacesPage from '../modules/places';
import VideoPage from '../modules/video';
import WelcomePage from '../modules/welcome';
import Layout from './Layout';

export const history = createBrowserHistory();

interface IRootRouterProps {
  collectionId: number;
}

const RootRouter = (props: IRootRouterProps) => (
  <Router history={history}>
    {props.collectionId ? (
      <Layout>
        <Switch>
          <Redirect from="/" exact={true} to="/welcome" />
          <Route path="/welcome" component={WelcomePage} />
          <Route path="/video" component={VideoPage} />
          <Route path="/chatbot" component={ChatbotPage} />
          <Route path="/mood" component={MoodPage} />
          <Route path="/places" component={PlacesPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
    ) : (
      'Please input collection id in query string. For example: ?placeCollectionId=2'
    )}
  </Router>
);

const mapStateToProps = (state: IAppState) => ({
  collectionId: initDux.placeCollectionIdSelector(state),
});

export default connect(mapStateToProps)(RootRouter);
