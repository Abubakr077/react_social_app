import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Grid } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Custom components
import {
  TrendsTable,
  MonitorUsersTable
} from './components';
import TopProfilesTable from "./components/TopProfilesTable";
import compose from "recompose/compose";
import {connect} from "react-redux";

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  item: {
    height: '100%'
  }
});

class Dashboard extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <DashboardLayout title="Dashboard">
        <div className={classes.root}>
          <Grid
            container
            spacing={4}
          >
            <Grid
                item
                lg={4}
                md={4}
                xl={3}
                xs={12}
            >
              <TrendsTable className={classes.item} />
            </Grid>
            <Grid
                item
                xl={3}
            >
              <TopProfilesTable className={classes.item} type={'Positive'} />
            </Grid>
          </Grid>
          <Grid
          container
          spacing={4}>
            <Grid
                item
                lg={8}
                md={8}
                xl={9}
                xs={12}
            >
              <MonitorUsersTable className={classes.item} />
            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    authenticate: state.authenticate
  }
};
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default
connect(mapStateToProps)
(withStyles(styles)
(Dashboard));
