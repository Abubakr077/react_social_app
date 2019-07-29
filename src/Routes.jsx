import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Views
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import NotFound from './views/NotFound';
import Dashboard from './views/Dashboard';
import Invites from './views/Invites';

import {connect} from 'react-redux';
import * as localStorageHelper from 'helpers/localStorage'

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
        <Route
          component={Invites}
          exact
          path="/invites"
        />
        {/*<Route*/}
        {/*  component={UserList}*/}
        {/*  exact*/}
        {/*  path="/users"*/}
        {/*/>*/}
        {/*<Route*/}
        {/*  component={ProductList}*/}
        {/*  exact*/}
        {/*  path="/products"*/}
        {/*/>*/}
        {/*<Route*/}
        {/*  component={Account}*/}
        {/*  exact*/}
        {/*  path="/account"*/}
        {/*/>*/}
        {/*<Route*/}
        {/*  component={Settings}*/}
        {/*  exact*/}
        {/*  path="/settings"*/}
        {/*/>*/}
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
        {/*<Route*/}
        {/*  component={UnderDevelopment}*/}
        {/*  exact*/}
        {/*  path="/under-development"*/}
        {/*/>*/}
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

