import React from 'react';
import ReactDOM from 'react-dom';
import createHashHistory from 'history/lib/createHashHistory';
import Relay, {DefaultNetworkLayer} from 'react-relay/classic';
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware';
import Router from 'react-router/lib/Router';
import useRouterHistory from 'react-router/lib/useRouterHistory';
import useRelay from 'react-router-relay';

import routes from './routes';

import './semantic-dist/semantic.css';
import './styles/index.css';

// Customize this based on your server's URL
const graphQLUrl = 'http://localhost:3001/graphql';

// Configure Relay with a "NetworkLayer"
Relay.injectNetworkLayer(new DefaultNetworkLayer(graphQLUrl));

const history = useRouterHistory(createHashHistory)();

ReactDOM.render(
  <Router
    history={history}
    routes={routes}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}
  />,
  document.getElementById('root')
);
