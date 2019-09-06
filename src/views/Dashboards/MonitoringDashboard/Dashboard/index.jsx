import React, {Component,PureComponent} from 'react';
import {
    LineChart,
    AreaChart,
    Area,
    Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
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
    WordClouds
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

    membership = null;
    componentWillMount() {
        const {match: {params}} = this.props;
        localStorage.setItem('project_id', params.projectId);
        this.membership = Object.assign({}, lookupProject(params.projectId));
    }

    render() {
        const {classes} = this.props;
        const data = [
            {
                name: 'Page A', uv: 4000, pv: 2400, qv: 2400, amt: 2400,
            },
            {
                name: 'Page B', uv: 3000, pv: 1398, qv: 2400,  amt: 2210,
            },
            {
                name: 'Page C', uv: 16000, pv: 9800, qv: 15000,  amt: 2290,
            },
            {
                name: 'Page D', uv: 2780, pv: 3908, qv: 2400,  amt: 2000,
            },
            {
                name: 'Page E', uv: 1890, pv: 4800, qv: 3000,  amt: 2181,
            },
            {
                name: 'Page F', uv: 2390, pv: 3800, qv: 2400,  amt: 2500,
            },
            {
                name: 'Page G', uv: 3490, pv: 4300, qv: 9000,  amt: 2100,
            },
        ];
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
                      <br/>
                      <br/>
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
                            <LineChart
                                width={900}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                <Line type="monotone" dataKey="qv" stroke="#ffc658" />
                                <Line type="monotone" dataKey="amt" stroke="#ffc658" />
                            </LineChart>

                            <AreaChart
                                width={900}
                                height={400}
                                data={data}
                                margin={{
                                    top: 10, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
                                <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                                <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
                            </AreaChart>

                        </Grid>
                      </Grid>

                      <br/>
                      <br/>
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
                              <WordClouds/>

                          </Grid>
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
