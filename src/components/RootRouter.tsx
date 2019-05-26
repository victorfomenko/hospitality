import { createBrowserHistory } from 'history';
import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import ChatbotPage from '../modules/chatbot';
import MoodPage from '../modules/mood';
import NotFoundPage from '../modules/notFound';
import PlacesPage from '../modules/places';
import VideoPage from '../modules/video';
import WelcomePage from '../modules/welcome';
import Layout from './Layout';

export const history = createBrowserHistory();

const RootRouter = () => (
  <Router history={history}>
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
  </Router>
);

export default RootRouter;
