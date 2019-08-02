import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from 'components/AsyncComponent';

import {connect} from 'react-redux';
import * as localStorageHelper from 'helpers/localStorage'

// Lazy Load Views
const SignUp = asyncComponent(() =>
    import('./views/SignUp').then(module => module.default)
);
const SignIn = asyncComponent(() =>
    import('./views/SignIn').then(module => module.default)
);
const NotFound = asyncComponent(() =>
    import('./views/NotFound').then(module => module.default)
);
const Dashboard = asyncComponent(() =>
    import('./views/Dashboards/InitDashboard/Dashboard').then(module => module.default)
);
const Dashboard2 = asyncComponent(() =>
    import('./views/Dashboards/MonitoringDashboard/Dashboard').then(module => module.default)
);
const Invites = asyncComponent(() =>
    import('./views/Dashboards/InitDashboard/Invites').then(module => module.default)
);

let isAuth = false;
let authToken = null;


const PrivateRoute = ({ component: Component, ...rest }) =>
  (
    <Route
      {...rest}
      render={(props) => (
          (isAuth === true || isAuth=== 'true') && authToken
          ? <Component {...props} />
          : <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
            />
      )}
    />
  );


class Routes extends Component {

  render() {
    isAuth = localStorageHelper.tytPreGetBool('isAuthenticated');
    const   user   = JSON.parse(localStorage.getItem('user'));

    if (user){
        authToken = user.x_auth_token.token;
    }

    return (
      <Switch>
        <Redirect
          exact
          from="/"
          to="/dashboard"
        />
        <PrivateRoute
          component={Dashboard}
          exact
          path="/dashboard"
        />
        <PrivateRoute
          component={Dashboard2}
          exact
          path="/dashboard/:projectId"
        />
        <PrivateRoute
          component={Invites}
          exact
          path="/invites"
        />

        <Route
          component={SignUp}
          exact
          path="/sign-up"
        />
        <Route
          component={SignIn}
          exact
          path="/login"
        />

        <Route
          component={NotFound}
          exact
          path="/not-found"
        />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    authenticate: state.authenticate,
    current: state
  }
};

export default
connect(mapStateToProps)
(Routes)

