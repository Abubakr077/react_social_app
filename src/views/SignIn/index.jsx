import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// Externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import validate from 'validate.js';
import _ from 'underscore';
// Material helpers
// Material components
import { Button, CircularProgress, Grid, IconButton, TextField, Typography, withStyles } from '@material-ui/core';
import request from 'helpers/request.js';
import endpoints from 'constants/endpoints.json';
import * as constants from 'constants/constants';
// Material icons
import { ArrowBack as ArrowBackIcon, Dvr, Public, Search } from '@material-ui/icons';
// Component styles
import styles from './styles';
// Form validation schema
import schema from './schema';
import theme from '../../theme';

import confirm from 'helpers/confirmation.js';

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
    // this.nameInput.focus();
  };
  _handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      if (this.state.isValid) {
        await this.handleSignIn(e);
      }
    }

  };

  handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { history } = this.props;
      const { values } = this.state;

      this.setState({ isLoading: true });
      await request({
        url: endpoints.login,
        method: 'POST',
        data: {
          email: values.email,
          password: values.password
        }
      }).then((res) => {
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('user', JSON.stringify(res));
        this.props.loginUser(res);

        confirm('UPGRADE NOW! 30 days left of Trail version.').then(
          (result) => {
            // `proceed` callback
            history.push('/dashboard');
          },
          (result) => {
            // `cancel` callback
          }
        );
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        serviceError: error.data,
        submitError: true,
        values: {
          email: '',
          password: ''
        }
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
                        <Search className={classes.frontIcons}/>
                      </IconButton>
                    </td>
                    <td>
                      <Typography
                        className={classes.quoteText}
                        variant="h3"
                        fontWeight='500'
                      >

                        Monitor profiles, channels, pages, blogs, trends and hashtag
                        simultaneously.
                      </Typography>
                    </td>
                  </tr>
                  <br/>
                  <tr>
                    <td>
                      <IconButton className={classes.largeButton}>
                        <Dvr className={classes.frontIcons}/>
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
                  <br/>
                  <tr>
                    <td>
                      <IconButton className={classes.largeButton} aria-label="Delete">
                        <Public className={classes.frontIcons}/>
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
                  <ArrowBackIcon/>
                </IconButton>
              </div>
              <div className={classes.contentBody}>
                <form className={classes.form}>
                  {/*<Typography*/}
                  {/*>*/}
                  {/*    <div className={classes.logodiv}>*/}
                  {/*        <img src="/images/logo.png" className={classes.titlelogo}/>*/}
                  {/*    </div>*/}
                  {/*</Typography>*/}

                  <Typography
                    color={'primary'}
                    variant="h1" component="h2"
                    style={{
                      display: 'flex',
                      alignSelf: 'flex-end',
                      justifyContent: 'center'
                    }}
                  >
                    <div>
                      <span style={{ marginRight: theme.spacing.unit }}>A</span>
                      <span style={{ marginRight: theme.spacing.unit }}>I</span>
                      <span style={{ marginRight: theme.spacing.unit }}>R</span>
                      <span style={{ marginRight: theme.spacing.unit }}>W</span>
                      <span style={{ marginRight: theme.spacing.unit }}>A</span>
                      <span style={{ marginRight: theme.spacing.unit }}>T</span>
                      <span style={{ marginRight: theme.spacing.unit }}>C</span>
                      <span>H</span>
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
                      value={values.email || ''}
                      variant="outlined"
                      onKeyDown={this._handleKeyDown}
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
                      value={values.password || ''}
                      variant="outlined"
                      onKeyDown={this._handleKeyDown}
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
                    <CircularProgress className={classes.progress}/>
                  ) : (
                    <Button
                      className={classes.signInButton}
                      color="primary"
                      disabled={!isValid}
                      onClick={(e) => {
                        this.handleSignIn(e);
                      }}
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
    projects: state.projects
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: user => dispatch({ type: constants.ADD_USER, user })
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withStyles(styles)
)(SignIn);
