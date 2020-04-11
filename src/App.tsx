import React from 'react';
import {
  // BrowserRouter as Router,
  Route,
  Switch,
  BrowserRouter,
  Redirect,
  // Redirect,
} from 'react-router-dom';
// import './App.css';
import asyncComponent from './views_helper/asyncComponent';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const App: React.FC = (): any => {
  return (
    // <BrowserRouter basename={window.location.pathname || ''}>
    <BrowserRouter>
      <Switch>
        <Route
          path="/login"
          component={
            asyncComponent(
              {
                requiresAuth: true,
                ifAuthedRedirectTo: '/admin/dashboard',
              },
              (): DynamicImportType => import('containers/SignIn'),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ) as any
          }
          // render={(props): React.ReactElement => <AdminLayout {...props} />}
        />
        <Route
          path="/admin"
          component={
            asyncComponent(
              {
                requiresAuth: true,
              },
              (): DynamicImportType => import('containers/Dashboard'),
              // import('src/bs3dashboard/layouts/Admin')
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ) as any
          }
          // render={(props): React.ReactElement => <AdminLayout {...props} />}
        />
        <Route
          path="/admin/dashboard"
          component={
            asyncComponent(
              {
                requiresAuth: true,
              },
              (): DynamicImportType => import('containers/Dashboard'),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ) as any
          }
          // render={(props): React.ReactElement => <AdminLayout {...props} />}
        />

        <Redirect from="/" to="/admin/dashboard" />

        <Route
          component={
            asyncComponent(
              {
                requiresAuth: true,
                ifAuthedRedirectTo: '/admin/dashboard',
              },
              (): DynamicImportType => import('containers/SignIn'),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ) as any
          }
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
