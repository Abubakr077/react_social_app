import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Views
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import NotFound from './views/NotFound';
import Dashboard from './views/Dashboard';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Redirect
          exact
          from="/"
          to="/dashboard"
        />
        <Route
          component={Dashboard}
          exact
          path="/dashboard"
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
        {/*  component={Typography}*/}
        {/*  exact*/}
        {/*  path="/typography"*/}
        {/*/>*/}
        {/*<Route*/}
        {/*  component={Icons}*/}
        {/*  exact*/}
        {/*  path="/icons"*/}
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
