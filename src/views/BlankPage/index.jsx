import React, { Component } from 'react';
// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
// Material helpers
import { Grid, withStyles } from '@material-ui/core';

import { Dashboard as DashboardLayout } from 'layouts';
// Component styles
import styles from './styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import NetworkGraph from '../Dashboards/MonitoringDashboard/components/NetworkGraph';
import LargestNetwork from '../Dashboards/MonitoringDashboard/components/Graphs/LargestNetwork';


class BlankPage extends Component {

  render() {
    const { classes, className, ...rest } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (
      <DashboardLayout className={rootClassName}
                       title="Blank Page"
                       initUser={false}>

        <div className={classes.root}>
          <Card >
            <CardContent>
                {/*<ProfilesNetwork/>*/}
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {/*<ProfilesNetwork />*/}
                  {/*<SecondLargest/>*/}
                  <LargestNetwork/>
                  {/*<NetworkGraph/>*/}
                </Typography>
                {/*<SecondLargest/>*/}
            </CardContent>
          </Card>
        </div>

      </DashboardLayout>
    );
  }
}

BlankPage.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BlankPage);

