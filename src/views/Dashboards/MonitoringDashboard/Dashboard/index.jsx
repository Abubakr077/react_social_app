import React, {Component} from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import {withStyles} from '@material-ui/core';

// Material components
import {
    Grid
} from '@material-ui/core';

// Shared layouts
import {
    Dashboard as DashboardLayout

} from 'layouts';

// Custom components
import {
    TrendsTable,
    MonitorUsersTable,
    MonitoringJobsTable,
    TopProfilesTable
} from './components';

import {connect} from 'react-redux';
import {lookupProject} from 'services/project';
import NoRecords from "../../../NoRecords";
// Component styles
const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 4,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    item: {
        height: '100%'
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    }
});

class Dashboard extends Component {

    state = {
        project: null
    };
    render() {

        const {classes} = this.props;
        const {match: {params}} = this.props;
        localStorage.setItem('project_id', params.projectId);
        const {project} = lookupProject(params.projectId);
        if (project) {
          return (
              <DashboardLayout
                  initUser={false}
                  title={project.name}
              >
                <div className={classes.root}>
                    <Grid
                        item
                        xs={12}
                    >
                        <MonitoringJobsTable className={classes.item} />
                    </Grid>
                <br/>
                <br/>
                  {/*<Grid*/}
                  {/*    container*/}
                  {/*    spacing={4}*/}
                  {/*>*/}
                  {/*  <Grid*/}
                  {/*      item*/}
                  {/*      lg={4}*/}
                  {/*      md={4}*/}
                  {/*      xl={3}*/}
                  {/*      xs={12}*/}
                  {/*  >*/}
                  {/*    <TrendsTable className={classes.item}/>*/}
                  {/*  </Grid>*/}
                  {/*  <Grid*/}
                  {/*      item*/}
                  {/*      xl={3}*/}
                  {/*  >*/}
                  {/*    <TopProfilesTable*/}
                  {/*        className={classes.item}*/}
                  {/*        type={'Positive'}*/}
                  {/*    />*/}
                  {/*  </Grid>*/}
                  {/*</Grid>*/}
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

const mapStateToProps = (state, ownProps) => {
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
