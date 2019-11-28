import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';
import * as constants from "constants/constants";
import {getJobStatus, getPreviousMonitorTasks} from 'services/monitoringJob';


// Externals
import classNames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';


// Material helpers
import {
    Button,
    Typography,
    withStyles
} from '@material-ui/core';

// Material components
import {
    CircularProgress
} from '@material-ui/core';

// Component styles
import styles from './styles';

import {
    Delete as DeleteIcon,
    PauseOutlined as PauseIcon,
    PlayArrowOutlined as PlayIcon

} from '@material-ui/icons';

// Shared components
import {
    Portlet,
    PortletHeader,
    PortletLabel,
    PortletContent,
    PortletToolbar
} from 'components';
import MaterialTable from "material-table";
import {toast} from "react-toastify";
import {Message, optionsError, optionsSuccess} from "../../../../../../../constants/constants";

import request from 'helpers/request.js';
import * as endpoints from 'constants/endpoints.json';
import confirm from 'helpers/confirmation.js';
import compose from "recompose/compose";
import {connect} from "react-redux";


class MonitoringJobsTable extends Component {
    signal = false;

    state = {
        isJobsLoading: false,
        jobsStatus: [],
        user: null,
        project_id: null,
        jobs: [],
        jobTasks: [],
        taskId: null,
        JobTaskId: null,
        JobTaskStatus: null,
    };


    async getMonitorJobs() {
        try {

            this.setState({isJobsLoading: true});
            this.user = JSON.parse(localStorage.getItem('user'));
            this.project_id = localStorage.getItem('project_id');
            this.setState({
                user: this.user,
                project_id: this.project_id
            });
            await request({
                url: endpoints.getProjectJobs,
                method: 'GET',
                headers: {
                    user_id: this.user.id,
                    x_auth_token: this.user.x_auth_token.token,
                    project_id: this.project_id
                }
            }).then((res) => {
                localStorage.setItem('jobs', JSON.stringify(res.monitoring_jobs));
                if (this.signal) {
                    this.setState({
                        isJobsLoading: false,
                        jobs: res.monitoring_jobs,
                    });
                    res.monitoring_jobs.map((job) => {
                        this.state.jobsStatus.push({
                            id: job.id,
                            loading: false,
                            success: false,
                            status: 'Start Analytics'
                        })
                    });
                }
            });
        } catch (error) {
            console.error(error);
            toast.error(<Message name={error.data}/>, optionsError);
            if (this.signal) {
                this.setState({
                    isJobsLoading: false,
                    error
                });
            }
        }
    }

    async startAnalytics(job) {

        const user = JSON.parse(localStorage.getItem('user'));
        const project_id = localStorage.getItem('project_id');
        this.setState({
            user: user,
            project_id: project_id
        });
        const {jobsStatus} = this.state;
        this.setState({
            jobsStatus: jobsStatus.map(el => (el.id === job.id ?
                Object.assign({}, el, {
                    loading: true,
                    success: false
                })
                : el))
        });
        ///
        try {

            await request({
                url: endpoints.initiateAnalysis + job.id,
                method: 'POST',
                headers: {
                    user_id: this.user.id,
                    x_auth_token: this.user.x_auth_token.token,
                    project_id: this.project_id
                }
            }).then((response) => {
                console.log('start getting status')
                this.setState({
                    status: response.status
                });
                try {
                    getJobStatus(this, job, response.id);
                } catch (error) {
                    console.log('get status catch');
                    toast.error(<Message name={error.message}/>, optionsError);
                    this.setState({
                        jobsStatus: jobsStatus.map(el => (el.id === job.id ?
                            Object.assign({}, el, {
                                loading: false,
                                success: false,
                            })
                            : el))
                    });
                }
            });
        } catch (error) {
            toast.error(<Message name={error.data}/>, optionsError);
            this.setState({
                jobsStatus: jobsStatus.map(el => (el.id === job.id ?
                    Object.assign({}, el, {
                        loading: false,
                        success: false,
                    })
                    : el))
            });

        }
        ///
    }


    componentDidMount() {
        this.signal = true;

        this.getMonitorJobs();
    }

    componentWillUnmount() {
        this.signal = false;
    }

    render() {
        const {classes, className} = this.props;
        const {isJobsLoading, jobs} = this.state;

        const rootClassName = classNames(classes.root, className);
        const showJobs = !isJobsLoading && jobs;

        console.log(this.state.jobsStatus);
        console.log((this.state.jobsStatus.filter(function (e) {
            if (e.id === '576603b0f77944f6939f3c55bee96f13') {
                return e.status
            }
        })));
        return (
            <div className={rootClassName}>
                {isJobsLoading && (
                    <div className={classes.progressWrapper}>
                        <CircularProgress/>
                    </div>
                )}
                {showJobs && (
                    <MaterialTable
                        columns={[
                            {title: 'Description', field: 'description'},
                            {title: 'Status', field: 'status'},
                            {
                                title: 'Job Runs',
                                field: 'jobRuns',
                                render: rowData => <span>{rowData.job_runs.length}</span>
                            },
                            {
                                title: 'Created At',
                                field: 'createdAt',
                                render: rowData => <span>{moment(rowData).format('DD/MM/YYYY')}</span>
                            },
                        ]}
                        actions={[
                            rowData => ({
                                icon: () => {
                                    if (rowData.status === "ACTIVE") {
                                        return (
                                            <div className={classes.yellowIcon}>
                                                <PauseIcon/>
                                            </div>)
                                    }
                                    return (
                                        <div className={classes.blueIcon}>
                                            <PlayIcon/>
                                        </div>)
                                },
                                onClick: (event, rowData) => {
                                    this.handleToggleStatus(rowData.id);
                                }
                            }),
                            rowData => ({
                                icon: () =>
                                    <div className={classes.deleteIcon}>
                                        <DeleteIcon/>
                                    </div>,
                                onClick: (event, rowData) => {
                                    confirm('Are you sure you want to delete ' + rowData.description + ' ?').then(
                                        (result) => {
                                            // `proceed` callback
                                            this.setState({
                                                isJobsLoading: true
                                            });
                                            this.handleDelete(rowData.id);
                                        },
                                        (result) => {
                                            // `cancel` callback
                                        }
                                    )
                                }
                            }),

                        ]}
                        data={this.state.jobs}
                        title="Monitoring Jobs"
                        options={{
                            search: false,
                            paging: false,
                            actionsColumnIndex: -1,
                        }}
                        detailPanel={rowData => {
                            return (
                                <Portlet
                                    className={classes.portlet}
                                >
                                    <PortletHeader>
                                        <PortletLabel
                                            title={"Job Details"}
                                        />
                                        <PortletToolbar>
                                            <Typography
                                                button
                                                className={classes.newEntryButton}
                                                variant="h7"
                                            >
                                                {'Next Run At : '}
                                            </Typography>
                                            <Typography
                                                button
                                                className={classes.newEntryButton}
                                                color="primary"
                                                variant="h7"
                                            >
                                                {moment(rowData.next_run_scheduled_at).format('LLLL')}
                                            </Typography>
                                        </PortletToolbar>
                                    </PortletHeader>
                                    <PortletContent className={classes.content} noPadding>

                                        {/*<Table>*/}
                                        {/*    <TableBody>*/}
                                        {/*        { Object.entries(rowData.job_details).map((t,i) =>{*/}
                                        {/*            if (t[i] !== ""){*/}
                                        {/*                    <TableRow*/}
                                        {/*                        className={classes.tableRow}*/}
                                        {/*                        hover*/}
                                        {/*                        key= {t[0] }*/}
                                        {/*                    >*/}
                                        {/*                        <TableCell> {t[0] }</TableCell>*/}
                                        {/*                        <TableCell> {t[1] }</TableCell>*/}
                                        {/*                    </TableRow>*/}
                                        {/*            }*/}
                                        {/*            }*/}
                                        {/*        )}*/}
                                        {/*    </TableBody>*/}
                                        {/*</Table>*/}

                                        { Object.entries(rowData.job_details).map((t,i) =>

                                            <div className={classes.fields}>
                                                {t[1]!== "" && (<div className={classes.textField}>
                                                    <Typography variant="subtitle1"
                                                                className={classes.title}>
                                                        {t[0] }
                                                    </Typography>

                                                    <Typography className={classes.caption}
                                                                color="primary"
                                                                variant="caption">
                                                        {t[1]}
                                                    </Typography>
                                                </div>) }

                                            </div>
                                            )

                                        }
                                    </PortletContent>
                                    <div className={classes.portletFooter}>
                                        <div className={classes.wrapper}>
                                            <div className={classes.analyticsButton}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    className={
                                                        this.state.jobsStatus.filter(function (e) {
                                                            return e.id === rowData.id && e.success;
                                                        }).length > 0
                                                            ? classes.buttonSuccess : ''
                                                    }
                                                    disabled={
                                                        this.state.jobsStatus.filter(function (e) {
                                                            return e.id === rowData.id && e.loading;
                                                        }).length > 0
                                                    }
                                                    onClick={() => {
                                                        this.goToAnalysis(rowData);
                                                    }}
                                                >
                                                    {
                                                        (this.state.jobsStatus.map((item) =>
                                                    {
                                                        if(item.id === rowData.id){
                                                            return item.status
                                                        }
                                                    }))

                                                    }
                                                </Button>
                                                {
                                                    (this.state.jobsStatus.filter(function (e) {
                                                        return (e.id === rowData.id && e.loading)
                                                    }).length > 0)
                                                    && (<CircularProgress size={24}
                                                                          className={classes.buttonProgress}/>)}
                                            </div>
                                            <Button
                                                className={classes.viewPrevious}
                                                variant="contained"
                                                onClick={() => {
                                                    this.goToPreviousAnalysis(rowData);
                                                }}
                                            >
                                                View Previous
                                            </Button>
                                        </div>
                                    </div>
                                </Portlet>
                            )
                        }}
                        onRowClick={(event, rowData, togglePanel) => {
                            togglePanel()
                            console.log(rowData);

                            // this.getPreviousMonitorTasks(rowData.id);
                            localStorage.setItem('jobTaskId',rowData.id);
                            this.props.dispatch({
                                type: constants.JOB_TASK_STATUS,
                                id: rowData.id
                            });
                            getPreviousMonitorTasks(this,rowData.id);
                        }}
                    />
                )}
            </div>
        );
    }


    goToAnalysis(rowData) {
        const {jobsStatus} = this.state;
        this.setState({
            jobsStatus: jobsStatus.map(el => (el.id === rowData.id ?
                Object.assign({}, el, {
                    loading: true,
                    success: false
                })
                : el))
        });
        localStorage.setItem('job', JSON.stringify(rowData));
        this.startAnalytics(rowData);

    }

    async handleDelete(id) {
        const {user, project_id, jobs} = this.state;
        const endpoint = endpoints.getProjectJobs + '/' + id + '?force=1';

        try {
            await request({
                url: endpoint,
                method: 'DELETE',
                headers: {
                    user_id: user.id,
                    x_auth_token: user.x_auth_token.token,
                    project_id: project_id
                }
            }).then(() => {
                    this.setState({
                        jobs: jobs.filter(job => job.id !== id),
                        isJobsLoading: false
                    });
                    toast.success(<Message name={'Job Deleted Successfully'}/>, optionsSuccess);
                }
            );
        } catch (error) {
            toast.error(<Message name={error.data}/>, optionsError);
            this.setState({
                isJobsLoading: false
            });
        }
    }

    async handleToggleStatus(id) {
        const {user, project_id, jobs} = this.state;
        try {
            await request({
                url: endpoints.getProjectJobs + '/' + id,
                method: 'PUT',
                headers: {
                    user_id: user.id,
                    x_auth_token: user.x_auth_token.token,
                    project_id: project_id
                }
            }).then((res) => {
                    this.setState({
                        jobs: jobs.map(el => (el.id === res.id && res.status !== 'PAUSED'?
                            Object.assign({}, el, {status: res.status, next_run_scheduled_at: res.next_run_scheduled_at})
                            : Object.assign({}, el, { status: res.status,next_run_scheduled_at: 'Paused'})))
                    });
                }
            );
        } catch (error) {
            toast.error(<Message name={error.data}/>, optionsError);
        }
    }

    goToPreviousAnalysis(rowData) {
        const {history} = this.props;
        localStorage.setItem('job', JSON.stringify(rowData));
        // history.push('/dashboard/project/previous_tasks', {job: {rowData}});
        history.push('/dashboard/project/previous_tasks', {
            taskId: rowData.id,
            jobName: rowData.description,
            target_subtype: rowData.job_details.target_subtype,
            target_type: rowData.job_details.target_type
        });

    }
}

MonitoringJobsTable.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired

};
const mapStateToProps = (state, ownProps) => {
    return {
        JobTaskId: state.JobTaskId,

    }
};

export default compose(
    connect(mapStateToProps),
    withRouter,
    withStyles(styles)
)
(MonitoringJobsTable);

