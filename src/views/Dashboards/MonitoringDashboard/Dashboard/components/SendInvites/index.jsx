import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import {
  CircularProgress, Dialog, DialogContent, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography,
  withStyles
} from '@material-ui/core';

import {
  Dashboard as DashboardLayout

} from 'layouts';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from 'components';

// Component styles
import styles from './styles';

import {lookupProject} from 'services/project';
import {TextField,Button} from "@material-ui/core";
import _ from "underscore";
import validate from "validate.js";
import schema from "./schema";
import {toast} from "react-toastify";
import {Message, optionsError} from "constants/constants";

import request from 'helpers/request.js';
import * as endpoints from 'constants/endpoints.json';
import * as constants from 'constants/constants.js';
import {optionsSuccess} from "../../../../../../constants/constants";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SentInvitesTable from "../Tables/SentInvitesTable";


class SendInvites extends Component {

  state = {
    isValid: false,
    submitError: false,
    serviceError: null,
    values: {
      email: '',
      role: ''
    },
    touched: {
      email: false,
      role: false
    },
    errors: {
      email: null,
      role: null
    }
  };

  validateForm = _.debounce(() => {
    const {values} = this.state;

    const newState = {...this.state};
    const errors = validate(values, schema);

    newState.errors = errors || {};
    newState.isValid = !errors;

    this.setState(newState);
  }, 300);

  handleFieldChange = (field, value) => {
    const newState = {...this.state};

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;

    this.setState(newState, this.validateForm);
  };
  render() {
    const { classes, className, ...rest } = this.props;
    const rootClassName = classNames(classes.root, className);
    const {
      isLoading,
      values,
      touched,
      errors,
      isValid,
      submitError,
      serviceError
    } = this.state;
    const showEmailError = touched.email && errors.email;
    const showRoleError = touched.role && errors.role;

    const id = localStorage.getItem("project_id");
      const {project} = lookupProject(id);
      const title = "Send Invites For "+ project.name ;

    return (
        <DashboardLayout className={rootClassName}
                         title={title}
                         initUser = {false}>
          <div className={classes.root}>
            <Portlet >
              <PortletHeader noDivider>
                <PortletLabel
                    subtitle="add email and role"
                    title="Send New Invite"
                />
              </PortletHeader>
              <form >
                <PortletContent
                    noPadding
                >
                  <div className={classes.field}>
                    <div className={classes.fieldDiv}>
                    <TextField
                        className={classes.textField}
                        label="Email"
                        margin="dense"
                        name="email"
                        onChange={event =>
                            this.handleFieldChange('email', event.target.value)
                        }
                        type="text"
                        value={values.email}
                    >
                    </TextField>
                      {showEmailError && (
                          <Typography
                              className={classes.fieldError}
                              variant="body2"
                          >
                            {errors.email[0]}
                          </Typography>
                      )}
                    </div>
                    <div className={classes.fieldDiv}>
                      <FormControl variant="outlined" className={classes.selectField} >
                        <InputLabel htmlFor="age-simple">Role</InputLabel>
                        <Select
                            autoWidth={false}
                            value={values.role}
                            onChange={event =>
                                this.handleFieldChange('role', event.target.value)
                            }
                            inputProps={{
                              name: 'role',
                              id: 'age-simple',
                            }}
                        >
                          <MenuItem value={'MEMBER'}>Member</MenuItem>
                          <MenuItem value={'ADMIN'}>Admin</MenuItem>
                        </Select>
                      </FormControl>

                    {showRoleError && (
                        <Typography
                            className={classes.fieldError}
                            variant="body2"
                        >
                          {errors.role[0]}
                        </Typography>
                    )}
                    </div>
                  </div>
                  {submitError && (
                      <Typography
                          className={classes.submitError}
                          variant="subtitle2"
                      >
                        {serviceError}
                      </Typography>
                  )}
                </PortletContent>
              <PortletFooter className={classes.portletFooter}>
                {isLoading ? (
                    <CircularProgress/>
                ) : (
                <Button
                    color="primary"
                    variant="contained"
                    onClick={()=>this.handleSendInvite()}
                    disabled={!isValid}
                >
                  Send
                </Button>
                )}
              </PortletFooter>
              </form>
            </Portlet>
            <Grid
                item
                xs={12}
            >
              <SentInvitesTable/>
            </Grid>
          </div>
        </DashboardLayout>
    );
  }

  async handleSendInvite() {
    this.setState({isLoading: true});

    const {values} = this.state;
    const user = JSON.parse(localStorage.getItem('user'));
    const project_id = localStorage.getItem('project_id');

    try {
      await request({
        url: endpoints.sendInvite,
        method: 'POST',
        headers: {
          user_id: user.id,
          x_auth_token: user.x_auth_token.token,
          project_id: project_id
        },
        data: {
          invitee_email: values.email,
          role: values.role
        }
      }).then((res) => {
        toast.success(<Message name={'Invite Sent Successfully'}/>,optionsSuccess);
          this.setState({
            isLoading: false
          });
      });
    } catch (error) {
        this.setState({
          isLoading: false,
          serviceError: error.data,
          submitError: true
        });
    }
  }
}

SendInvites.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SendInvites);

