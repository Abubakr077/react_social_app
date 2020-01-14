import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
// Externals
import PropTypes from 'prop-types';
// Material helpers
// Material components
import {CircularProgress, Grid, Typography, withStyles} from '@material-ui/core';
import {getPreviousMonitorTasks} from 'services/monitoringJob';
// Component styles
import styles from './styles';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import MaterialTable from "material-table";
import compose from "recompose/compose";

import {Dashboard as DashboardLayout} from 'layouts';
import {statusColors} from 'constants/constants.js';
import {Status} from 'components';

// Shared components
class PreviousAnalyticsTable extends Component {
    signal = false;

    state = {
        isLoading: false,
        jobTasks: []
    };


    componentDidMount() {
        this.signal = true;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.project_id = localStorage.getItem('project_id');
        this.prevState = this.props.location.state;
        getPreviousMonitorTasks(this,this.prevState.taskId);
    }

    render() {
        const {classes} = this.props;
        const {isLoading} = this.state;

        this.prevState = this.props.location.state;

        return (
            <DashboardLayout className={classes.root}
                             title={ 'Previous Tasks of '+this.prevState.jobName}
                             initUser={false}
                             options={{
                                 isTweetsRoute: true
                             }}
            >
                <div className={classes.root}>
                    <Grid
                        item
                        xs={10}
                        className={classes.barGrapth}
                    >
                        {isLoading ? (
                            <div className={classes.progressWrapper}>
                                <CircularProgress/>
                            </div>
                        ) : (
                            <MaterialTable
                                columns={[
                                    {title: 'Status', field: 'status',
                                        render: rowData =>
                                            <Typography
                                            >
                                                <div className={classes.statusWrapper}>
                                                    <Status
                                                        className={classes.status}
                                                        color={statusColors[rowData.status]}
                                                        size="sm"
                                                    />
                                                    {rowData.status}
                                                </div>
                                            </Typography>
                                    },
                                    {title: 'Created At',
                                        defaultSort: 'desc',
                                        field: 'created_at'},
                                ]}
                                data={this.state.jobTasks}
                                title="Previous Tasks"
                                // onRowClick={(event, rowData, togglePanel) =>
                                //     this.goToAnalysis()}
                                options={{
                                    search: true,
                                    paging: false,
                                    actionsColumnIndex: -1,
                                    exportButton: true,
                                    exportAllData: true
                                }}
                                actions={[
                                    rowData => ({
                                        icon: () => {
                                            return (
                                                <div className={classes.icon}>
                                                    <EqualizerOutlinedIcon/>
                                                </div>)
                                        },
                                        tooltip: 'View Analytics',
                                        disabled: rowData.status !== 'FINISHED',
                                        onClick: (event, rowData) => {
                                            this.getMonitorData(rowData.id);
                                        }
                                    }),

                                ]}

                            />
                        )}
                    </Grid>
                </div>
            </DashboardLayout>
        );
    }
    async getMonitorData(id) {
        const { history } = this.props;
        history.push('/dashboard/project/analysis',{type: this.prevState.target_subtype , target_type: this.prevState.target_type , taskId: id});
    }

}

PreviousAnalyticsTable.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired

};

export default compose(
    withRouter,
    withStyles(styles)
)(PreviousAnalyticsTable);