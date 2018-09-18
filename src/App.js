import React from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import 'mapbox-gl/dist/mapbox-gl.css';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloLink, split } from 'apollo-client-preset';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { AUTH_TOKEN } from './constants';

import theme from './theme';
import HeaderNavigation from './components/HeaderNavigation';
import Footer from './components/Footer';
import AnimatedRoutes from './AnimatedRoutes';
import routes from './routes';

// Apollo client setup
const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/subscriptions',
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN),
    },
  },
});

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  const authorizationHeader = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      authorization: authorizationHeader,
    },
  });
  return forward(operation);
});

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);

const cache = new InMemoryCache();

// Local client state
// When checking local mutations in Apollo browser extension, be sure to check
// "Load from cache" to see the current local state.
const stateLink = withClientState({
  cache,
  resolvers: {
    Query: {},
    Mutation: {
      destinationSelected: (_, { destination }, { cache }) => {
        const data = {
          destinationSelected: destination,
        };
        cache.writeData({ data });
        return null;
      },
      dateSelected: (_, { date }, { cache }) => {
        const data = {
          dateSelected: date,
        };
        cache.writeData({ data });
        return null;
      },
      timeSelected: (_, { time }, { cache }) => {
        const data = {
          timeSelected: time,
        };
        cache.writeData({ data });
        return null;
      },
      requestedAuthFromDestination: (_, args, { cache }) => {
        const data = {
          authFromDestination: true,
        };
        cache.writeData({ data });
        return null;
      },
      authFromDestinationSuccessful: (_, args, { cache }) => {
        const data = {
          authFromDestination: false,
        };
        cache.writeData({ data });
        return null;
      },
      resetDestinationForm: (_, args, { cache }) => {
        const data = {
          destinationSelected: null,
          dateSelected: null,
          timeSelected: null,
        };
        cache.writeData({ data });
        return null;
      },
    },
  },
  defaults: {
    destinationSelected: null,
    dateSelected: null,
    timeSelected: null,
    authFromDestination: false,
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLinkWithAuthToken,
);

const client = new ApolloClient({
  link: ApolloLink.from([stateLink, link]),
  cache,
});

const HeaderNavigationWithRouter = withRouter(props => <HeaderNavigation {...props} />);

const AppContainer = styled.div`
  width: 100%;
  margin: 0px auto;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const App = () => (
  <Router>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <HeaderNavigationWithRouter />
          <AnimatedRoutes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
            <Redirect from="/" exact to="home" />
          </AnimatedRoutes>
          <Footer />
        </AppContainer>
      </ThemeProvider>
    </ApolloProvider>
  </Router>
);

export default App;
