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
import { InvitesView } from "./components";





class Invites extends Component {



  render() {
    const { classes, className, ...rest } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (
        <DashboardLayout className={rootClassName}
                         title="Accept or Reject Invites"
                         initUser = {true}>
          <div className={classes.root}>
              < InvitesView/>
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

