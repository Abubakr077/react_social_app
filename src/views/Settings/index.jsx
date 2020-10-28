import React, { Component } from 'react';
// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';
// Material components
import { Grid, Typography, withStyles } from '@material-ui/core';
import { Dashboard as DashboardLayout } from 'layouts';
// Component styles
import styles from './styles';



class Settings extends Component {
  render() {
    const { classes, className, ...rest } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (
      <DashboardLayout className={rootClassName}
                       title="No Result Found"
                       initUser={true}>

        <div className={classes.root}>
          <Grid
            item
            lg={6}
            xs={12}
          >
            <div className={classes.content}>
              <Typography variant="h1">
                Account Settings!
              </Typography>
              <Typography variant="subtitle2">
                Yhelltried some shady route or you came here by mistake.
                Whichever it is, try using the navigation
              </Typography>   
            </div>
          </Grid>

      </div>

      </DashboardLayout>
      
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Settings);
