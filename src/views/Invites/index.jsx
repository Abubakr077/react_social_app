import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Material helpers
import {
  withStyles
} from '@material-ui/core';

import {
  Dashboard as DashboardLayout

} from 'layouts';

// Component styles
import styles from './styles';
import NoRecords from "../NoRecords";
import { InvitesView } from "./components";




class Invites extends Component {
  state = {
    projects: [],
    isRecords: false
  };

  updateView() {
    this.setState(
        {
          isRecords: true
        }
    );
  }



  render() {
    const { classes, className, ...rest } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (
        <DashboardLayout title="Initialize User" initUser = {true}>
          <div className={classes.root}>
              <InvitesView/>
            {/*{(!this.state.isRecords) && < InvitesView view={this.updateView.bind(this)}/>}*/}
            {/*{(this.state.isRecords) && < NoRecords title={'No Invites at this moment'} subTitle={''}/>}*/}
          </div>
        </DashboardLayout>
    );
  }
}

Invites.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Invites);

