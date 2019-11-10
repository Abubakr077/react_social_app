import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';


// Material helpers
import {Grid, Typography, withStyles} from '@material-ui/core';
import {getJobStatus,getPreviousMonitorTasks} from 'services/MonitoringJob';

// Material components
import {
    CircularProgress
} from '@material-ui/core';

// Component styles
import styles from './styles';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import request from 'helpers/request.js';
import * as endpoints from 'constants/endpoints.json';
// Shared components

import MaterialTable from "material-table";
import compose from "recompose/compose";

import {
    Dashboard as DashboardLayout

} from 'layouts';
import {toast} from "react-toastify";
import {Message, optionsError} from "../../../../../../constants/constants";
import {statusColors} from 'constants/constants.js';
import {Status} from 'components';
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

    componentWillUnmount() {
        this.signal = false;
    }

    render() {
        const {classes, className} = this.props;
        const {isLoading, jobTasks} = this.state;

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
                                onRowClick={(event, rowData, togglePanel) => this.goToAnalysis()}
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

    goToAnalysis() {
        const { history } = this.props;
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
)
(PreviousAnalyticsTable);
