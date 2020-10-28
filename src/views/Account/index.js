
import React, { Component } from 'react';
// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';

import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import { Dashboard as DashboardLayout } from 'layouts';
// Component styles
import styles from './styles';
import axios from 'axios';
import * as endpoints from '../../constants/endpoints.json';
import { getPreviousMonitorTasks } from '../../services/monitoringJob';
import request from '../../helpers/request';
import { toast } from 'react-toastify';
import { Message, optionsError } from '../../constants/constants';


class Account extends Component {
  state = {
    loading: true,
    person: null,
  };

  async componentDidMount(){
    await request({
      url: 'https://api.randomuser.me',
      method: 'GET',
    }).then((res) => {
      if (res.results) {
        this.setState({
          person: res.results[0],
          loading: false,
          data: res
        });
      }
    });
  }


  render() {
    const { classes, className, ...rest } = this.props;
    const rootClassName = classNames(classes.root, className);
    return (
      <DashboardLayout className={rootClassName}
                       title="Account Settings"
                       initUser={false}>
        <div className={classes.root}>
          <div>
            {this.state.loading || !this.state.person ? (
              <div>loading...</div>
            ) : (
              <div>
                <div>{this.state.person.name.title}</div>
                <div>{this.state.person.name.first}</div>
                <div>{this.state.person.name.last}</div>
                <div>{this.state.person.location.country}</div>
              </div>
            )}
          </div>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >

              <Profile />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <ProfileDetails />
            </Grid>
          </Grid>
          {/*<ProfilesNetwork /> */}
        </div>
      </DashboardLayout>
    );
  }
}

Account.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);