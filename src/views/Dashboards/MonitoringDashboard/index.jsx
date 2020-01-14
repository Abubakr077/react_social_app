import React, {Component} from 'react';
// Externals
import PropTypes from 'prop-types';
// Material helpers
// Material components
import {Grid, withStyles} from '@material-ui/core';
// Shared layouts
import {Dashboard as DashboardLayout} from 'layouts';
// Custom components
import {MonitoringJobsTable} from './components';

import {connect} from 'react-redux';
// Component styles
const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 4,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '80vh',
    },
    item: {
        height: '100%'
    },
});

class Dashboard extends Component {

    membership = null;

    componentWillMount() {
        const {match: {params}} = this.props;
        this.membership = JSON.parse(localStorage.getItem('project'));
    }


    render() {
        const {classes} = this.props;

        if (this.membership) {
          return (
              <DashboardLayout
                  initUser={false}
                  title={this.membership.project.name}
              >
                  <div className={classes.root}>
                      <Grid
                          item
                          xs={12}
                      >
                          <MonitoringJobsTable className={classes.item} />
                      </Grid>
                      {/*  <br/>*/}
                      {/*  <br/>*/}
                      {/*<Grid*/}
                      {/*    container*/}
                      {/*    spacing={4}*/}
                      {/*>*/}
                      {/*  <Grid*/}
                      {/*      item*/}
                      {/*      lg={8}*/}
                      {/*      md={8}*/}
                      {/*      xl={9}*/}
                      {/*      xs={12}*/}
                      {/*  >*/}
                      {/*    <MonitorUsersTable className={classes.item}/>*/}
                      {/*  </Grid>*/}
                      {/*</Grid>*/}
                  </div>
              </DashboardLayout>
          );
        }
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        authenticate: state.authenticate,

    }
};
Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)
(withStyles(styles)
(Dashboard));
