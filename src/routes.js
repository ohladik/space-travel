import React from 'react';
import Loadable from 'react-loadable';
import Spinner from 'react-spinkit';

// Code-splitting in routes
const Loading = () => <Spinner name="double-bounce" />;

const Home = Loadable({
  loader: () => import('./scenes/Home'),
  loading: Loading,
});

const Tickets = Loadable({
  loader: () => import('./scenes/Tickets'),
  loading: Loading,
});

const Destinations = Loadable({
  loader: () => import('./scenes/Destinations'),
  loading: Loading,
});

const DestinationDetail = Loadable({
  loader: () => import('./scenes/DestinationDetail'),
  loading: Loading,
});

const DepartureSelection = Loadable({
  loader: () => import('./scenes/DepartureSelection'),
  loading: Loading,
});

const SeatsSelection = Loadable({
  loader: () => import('./scenes/SeatsSelection'),
  loading: Loading,
});

const Checkout = Loadable({
  loader: () => import('./scenes/Checkout'),
  loading: Loading,
});

const AirQualityMap = Loadable({
  loader: () => import('./scenes/AirQualityMap'),
  loading: Loading,
});

const RoutesMap = Loadable({
  loader: () => import('./scenes/RoutesMap'),
  loading: Loading,
});

const Registration = Loadable({
  loader: () => import('./scenes/Registration'),
  loading: Loading,
});

const Login = Loadable({
  loader: () => import('./scenes/Login'),
  loading: Loading,
});

// React Router routes
// each route has a path and a component
const routes = [
  {
    path: '/home',
    exact: true,
    component: () => <Home />,
  },
  {
    path: '/tickets',
    component: () => <Tickets />,
  },
  {
    path: '/destinations',
    exact: true,
    component: () => <Destinations />,
  },
  {
    path: '/destination/:id',
    component: props => <DestinationDetail {...props} />,
  },
  {
    path: '/departure/:id',
    component: props => <DepartureSelection {...props} />,
  },
  {
    path: '/seats/:id',
    component: props => <SeatsSelection {...props} />,
  },
  {
    path: '/checkout',
    component: props => <Checkout {...props} />,
  },
  {
    path: '/airquality',
    component: props => <AirQualityMap {...props} />,
  },
  {
    path: '/routes',
    component: props => <RoutesMap {...props} />,
  },
  {
    path: '/register',
    component: props => <Registration {...props} />,
  },
  {
    path: '/login',
    component: props => <Login {...props} />,
  },
];

export default routes;
