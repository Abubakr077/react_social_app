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

const SendInvites = asyncComponent(() =>
    import('./views/Dashboards/MonitoringDashboard/Dashboard/components/SendInvites').then(module => module.default)
);
const JobAnalysis = asyncComponent(() =>
    import('./views/Dashboards/MonitoringDashboard/Dashboard/components/JobAnalysis').then(module => module.default)
);
const PreviousAnalysis = asyncComponent(() =>
    import('./views/Dashboards/MonitoringDashboard/Dashboard/components/PreviousAnalytics').then(module => module.default)
);
const TweetsList = asyncComponent(() =>
    import('./views/Dashboards/MonitoringDashboard/Dashboard/components/TweetsList').then(module => module.default)
);
const TrendHatePool = asyncComponent(() =>
    import('./views/Dashboards/MonitoringDashboard/Dashboard/components/TrendHatePool').then(module => module.default)
);
const Invites = asyncComponent(() =>
    import('./views/Dashboards/InitDashboard/Dashboard/Invites').then(module => module.default)
);

const CreateJob = asyncComponent(() =>
    import('./views/CreateJob').then(module => module.default)
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
          path="/dashboard/project"
        />
        <PrivateRoute
          component={Invites}
          exact
          path="/invites"
        />
          <PrivateRoute
              component={SendInvites}
              exact
              path="/send_invites"
          />
          <PrivateRoute
              component={JobAnalysis}
              exact
              path="/dashboard/project/analysis"
          />
          <PrivateRoute
              component={PreviousAnalysis}
              exact
              path="/dashboard/project/previous_tasks"
          />
          <PrivateRoute
              component={TweetsList}
              exact
              path="/dashboard/project/analysis/tweets"
          />
          <PrivateRoute
              component={TrendHatePool}
              exact
              path="/dashboard/project/analysis/hate_pool"
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

        <Route
          component={CreateJob}
          exact
          path="/createJob"
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

