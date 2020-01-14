import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
// Externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import validate from 'validate.js';
import _ from 'underscore';
// Material helpers
// Material components
import {
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography,
  withStyles
} from '@material-ui/core';
// Material icons
import {ArrowBack as ArrowBackIcon, Dvr, Public, Search} from '@material-ui/icons';
// Shared utilities
import validators from 'common/validators';
// Component styles
import styles from './styles';
// Form validation schema
import schema from './schema';
import request from "helpers/request";
import endpoints from "constants/endpoints";
import {Message, optionsSuccess} from "../../constants/constants";
import {toast} from 'react-toastify';

validate.validators.checked = validators.checked;

class SignUp extends Component {
  state = {
    values: {
      name: '',
      email: '',
      password: '',
      policy: false
    },
    touched: {
      name: false,
      email: false,
      password: false,
      policy: null
    },
    errors: {
      name: null,
      email: null,
      password: null,
      policy: null
    },
    isValid: false,
    isLoading: false,
    submitError: false,
    serviceError: null,
    isSignedUp: false
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

  handleSignUp = async () => {
    try {
      const { values } = this.state;

      this.setState({
        isLoading: true,
      });

      await request({
        url:    endpoints.signUp,
        method: 'POST',
        data:   {
          name: values.name,
          email: values.email,
          password: values.password
        }
      }).then(()=>{
        this.setState({isLoading: false,
          isSignedUp: true
        });
        toast.success(<Message name={'Sign up Successfully. Login to continue!'}/>,optionsSuccess);
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        serviceError: error.data,
        submitError: true,
      });
    }
  };
  handleSignIn =() => {
      const { history } = this.props;
    history.push('/login');
  };

  _handleKeyDown = async (e) => {
    if (e.key === 'Enter' ) {
      console.log('entered');
      if (this.state.isValid){
        console.log('signed in');
        await this.handleSignUp();
      }
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
      isLoading,
      serviceError
    } = this.state;

    const showLastNameError =
      touched.name && errors.name ? errors.name[0] : false;
    const showEmailError =
      touched.email && errors.email ? errors.email[0] : false;
    const showPasswordError =
      touched.password && errors.password ? errors.password[0] : false;
    const showPolicyError =
      touched.policy && errors.policy ? errors.policy[0] : false;

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
          {this.state.isSignedUp ?
            (<Grid
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
                      New Account Created
                    </Typography>
                    <Typography
                        className={classes.subtitle}
                        variant="body1"
                    >
                      Your account has been created.Please click below to login.
                    </Typography>
                    <div className={classes.fields}>
                      <Button
                          className={classes.signUpButton}
                          color="primary"
                          onClick={this.handleSignIn}
                          size="large"
                          variant="contained"
                      >
                        Login Now
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </Grid>) :
              (<Grid
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
                        Create new account
                      </Typography>
                      <Typography
                          className={classes.subtitle}
                          variant="body1"
                      >
                        Use your work email to create new account... it's free.
                      </Typography>
                      <div className={classes.fields}>
                        <TextField
                            className={classes.textField}
                            label="Name"
                            onChange={event =>
                                this.handleFieldChange('name', event.target.value)
                            }
                            value={values.name}
                            variant="outlined"
                            onKeyDown={this._handleKeyDown}
                        />
                        {showLastNameError && (
                            <Typography
                                className={classes.fieldError}
                                variant="body2"
                            >
                              {errors.name[0]}
                            </Typography>
                        )}
                        <TextField
                            className={classes.textField}
                            label="Email address"
                            name="email"
                            onChange={event =>
                                this.handleFieldChange('email', event.target.value)
                            }
                            value={values.email}
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
                            onChange={event =>
                                this.handleFieldChange('password', event.target.value)
                            }
                            type="password"
                            value={values.password}
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
                        <div className={classes.policy}>
                          <Checkbox
                              checked={values.policy}
                              className={classes.policyCheckbox}
                              color="primary"
                              name="policy"
                              onKeyDown={this._handleKeyDown}
                              onChange={() =>
                                  this.handleFieldChange('policy', !values.policy)
                              }
                          />
                          <Typography
                              className={classes.policyText}
                              variant="body1"
                          >
                            I have read the &nbsp;
                            <Link
                                className={classes.policyUrl}
                                to="#"
                            >
                              Terms and Conditions
                            </Link>
                            .
                          </Typography>
                        </div>
                        {showPolicyError && (
                            <Typography
                                className={classes.fieldError}
                                variant="body2"
                            >
                              {errors.policy[0]}
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
                              className={classes.signUpButton}
                              color="primary"
                              disabled={!isValid}
                              onClick={this.handleSignUp}
                              size="large"
                              variant="contained"
                          >
                            Sign up now
                          </Button>
                      )}
                      <Typography
                          className={classes.signIn}
                          variant="body1"
                      >
                        Have an account?{' '}
                        <Link
                            className={classes.signInUrl}
                            to="/login"
                        >
                          Sign In
                        </Link>
                      </Typography>
                    </form>
                  </div>
                </div>
              </Grid>)

          }

        </Grid>
      </div>
    );
  }
}

SignUp.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(SignUp);
