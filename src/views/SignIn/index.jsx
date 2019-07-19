import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


// Externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import validate from 'validate.js';
import _ from 'underscore';
import { toast } from 'react-toastify';

// Material helpers
import { withStyles } from '@material-ui/core';
import request from 'helpers/request.js';
import endpoints from 'constants/endpoints.json';
import * as constants from 'constants/constants'
// Material components
import {
  Grid,
  Button,
  IconButton,
  CircularProgress,
  TextField,
  Typography
} from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

// Material icons
import { ArrowBack as ArrowBackIcon, Search, Dvr, Public } from '@material-ui/icons';

// Component styles
import styles from './styles';

// Form validation schema
import schema from './schema';
import axios from 'axios';
import {Message, optionsError} from "../../constants/constants";


class SignIn extends Component {


    state = {
    user: null,
    values: {
      email: '',
      password: ''
    },
    touched: {
      email: false,
      password: false
    },
    errors: {
      email: null,
      password: null
    },
    isValid: false,
    isLoading: false,
    submitError: false,
    serviceError: null
  };

  handleBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  validateForm = _.debounce(() => {
    const { values } = this.state;

    const newState = { ...this.state };
    const errors = validate(values, schema);

    newState.errors = errors || {};
    newState.isValid = !errors;

    this.setState(newState);
  }, 300);

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;

    this.setState(newState, this.validateForm);
  };

  handleSignIn = async () => {

    try {
      const { history } = this.props;
      const { values } = this.state;

      this.setState({ isLoading: true });

        const user =await request({
            url:    endpoints.loginEndpoint,
            method: 'POST',
            data:   {
                email: values.email,
                password: values.password
            }
        });
     // const { status,user} = await signIn(values.email, values.password);

      this.setState({isLoading: false});
      this.props.loginUser(user);
     // localStorage.seItem('isAuthenticated', true);
        history.push('/dashboard');
    } catch (error) {
      this.setState({
        isLoading: false,
        serviceError: error.data,
        submitError: true,
      });
    }
  };

    render() {
    const { classes } = this.props;
    const {
      values,
      touched,
      errors,
      isValid,
      submitError,
      serviceError,
      isLoading
    } = this.state;

    const showEmailError = touched.email && errors.email;
    const showPasswordError = touched.password && errors.password;

    return (
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
        >
          <Grid
            className={classes.quoteWrapper}
            item
            lg={7}
          >
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <table>
                  <tr>
                    <td>
                      <IconButton className={classes.largeButton} aria-label="Delete">
                        <Search className={classes.frontIcons} />
                      </IconButton>
                    </td>
                    <td>
                      <Typography
                        className={classes.quoteText}
                        variant="h3"
                        fontWeight='500'
                      >

                        Monitor profiles, channels, pages, blogs, trends and hashtag simultaneously.
                </Typography>
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>
                      <IconButton className={classes.largeButton} >
                        <Dvr className={classes.frontIcons} />
                      </IconButton>
                    </td>
                    <td>
                      <Typography
                        className={classes.quoteText}
                        variant="h3"
                        fontWeight='500'
                      >

                        Perform visual analytics and generate reports.
                </Typography>
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>
                      <IconButton className={classes.largeButton} aria-label="Delete">
                        <Public className={classes.frontIcons} />
                      </IconButton>
                    </td>
                    <td>
                      <Typography
                        className={classes.quoteText}
                        variant="h3"
                        fontWeight='500'
                      >

                        Support for Twitter, Facebook, Youtube, and counting....
                </Typography>
                    </td>
                  </tr>
                </table>
              </div>
            </div>

          </Grid>
          <Grid
            className={classes.content}
            item
            lg={5}
            xs={12}
          >
            <div className={classes.content}>
              <div className={classes.contentHeader}>
                <IconButton
                  className={classes.backButton}
                  onClick={this.handleBack}
                >
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <div className={classes.contentBody}>
                <form className={classes.form}>
                  <Typography
                  >
                    <div className={classes.logodiv}>
                      <img src="/images/logo.png" className={classes.titlelogo} />
                    </div>
                  </Typography>
                  <Typography
                    className={classes.title}
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <div className={classes.fields}>
                    <TextField
                      className={classes.textField}
                      label="Email address"
                      name="email"
                      onChange={event =>
                        this.handleFieldChange('email', event.target.value)
                      }
                      type="text"
                      value={values.email}
                      variant="outlined"
                    />
                    {showEmailError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.email[0]}
                      </Typography>
                    )}
                    <TextField
                      className={classes.textField}
                      label="Password"
                      name="password"
                      onChange={event =>
                        this.handleFieldChange('password', event.target.value)
                      }
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                    {showPasswordError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.password[0]}
                      </Typography>
                    )}
                  </div>
                  {submitError && (
                    <Typography
                      className={classes.submitError}
                      variant="subtitle2"
                    >
                        {serviceError}
                    </Typography>
                  )}
                  {isLoading ? (
                    <CircularProgress className={classes.progress} />
                  ) : (
                      <Button
                        className={classes.signInButton}
                        color="primary"
                        disabled={!isValid}
                        onClick={this.handleSignIn}
                        size="large"
                        variant="contained"
                      >
                        Sign in now
                    </Button>
                    )}
                  <Typography
                    className={classes.signUp}
                    variant="body1"
                  >
                    Don't have an account?{' '}
                    <Link
                      className={classes.signUpUrl}
                      to="/sign-up"
                    >
                      Sign up
                    </Link>
                  </Typography>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SignIn.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: user => dispatch(
          {
          type:constants.ADD_USER, user}
          )
  }
};
export default
compose(
    connect(mapStateToProps, mapDispatchToProps),
withRouter,
  withStyles(styles)
)(SignIn);
