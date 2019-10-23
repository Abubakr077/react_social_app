import React, {Component, useRef, createRef, useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {getJobStatus,getPreviousMonitorTasks} from 'services/MonitoringJob';
import * as constants from "constants/constants";


// Externals
import classNames from 'classnames';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';


// Material helpers
import {Button, Divider, TableCell, Typography, withStyles} from '@material-ui/core';

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
    PortletFooter,
    PortletToolbar
} from 'components';
import MaterialTable from "material-table";
import TextField from "@material-ui/core/TextField";
import {toast} from "react-toastify";
import {Message, optionsError, optionsSuccess} from "../../../../../../../constants/constants";

import request from 'helpers/request.js';
import Request from 'helpers/polling/Request.js';
import * as endpoints from 'constants/endpoints.json';
import confirm from 'helpers/confirmation.js';
import compose from "recompose/compose";
import {connect} from "react-redux";
import {local} from "d3-selection";


class MonitoringJobsTable extends Component {
    signal = false;

    state = {
        isJobsLoading: false,
        loading: false,
        success: false,
        completed: false,
        user: null,
        project_id: null,
        jobs: [],
        jobTasks: [],
        taskId: null,
        JobTaskId: null
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
                        jobs: res.monitoring_jobs
                    });
                }
            });
        } catch (error) {
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

        this.setState({
            loading: true,
            success: false
        });
        const user = JSON.parse(localStorage.getItem('user'));
        const project_id = localStorage.getItem('project_id');
        this.setState({
            user: user,
            project_id: project_id
        });
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
                console.log(response);
                // if (response.data.status === 'QUEUED' || response.data.status === 'STARTED') {
                console.log('start getting status');
                const id = response.id;

                try {
                    getJobStatus(this,id);
                } catch (error) {
                    console.log('get status catch');
                    toast.error(<Message name={error.message}/>, optionsError);
                    this.setState({
                        loading: false,
                        success: false,
                        error
                    });
                }
            });
        } catch (error) {
            toast.error(<Message name={error.data}/>, optionsError);
            this.setState({
                loading: false,
                success: false,
                error
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
                                        <div className={classes.fields}>
                                            <div className={classes.textField}>
                                                <Typography variant="subtitle1"
                                                            className={classes.title}>
                                                    platform :
                                                </Typography>

                                                <Typography className={classes.caption}
                                                            variant="caption">
                                                    {rowData.job_details.platform}
                                                </Typography>
                                            </div>
                                            <div className={classes.textField}>
                                                <Typography variant="subtitle1"
                                                            className={classes.title}>
                                                    All Words :
                                                </Typography>
                                                <Typography className={classes.caption}
                                                            variant="caption">
                                                    {rowData.job_details.all_words}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className={classes.fields}>
                                            <div className={classes.textField}>
                                                <Typography variant="subtitle1"
                                                            className={classes.title}>
                                                    number of tweets :
                                                </Typography>
                                                <Typography className={classes.caption}
                                                            variant="caption">
                                                    {rowData.job_details.crawl_num_tweets}
                                                </Typography>
                                            </div>
                                            <div className={classes.textField}>
                                                <Typography variant="subtitle1"
                                                            className={classes.title}>
                                                    Exact phrase :
                                                </Typography>
                                                <Typography className={classes.caption}
                                                            variant="caption">
                                                    {rowData.job_details.exact_phrase}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className={classes.fields}>
                                            <div className={classes.textField}>
                                                <Typography variant="subtitle1"
                                                            className={classes.title}>
                                                    from :
                                                </Typography>
                                                <Typography className={classes.caption}
                                                            variant="caption">
                                                    {rowData.job_details.from_date}
                                                </Typography>
                                            </div>
                                            <div className={classes.textField}>
                                                <Typography variant="subtitle1"
                                                            className={classes.title}>
                                                    to :
                                                </Typography>
                                                <Typography className={classes.caption}
                                                            variant="caption">
                                                    {rowData.job_details.to_date}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className={classes.fields}>
                                            <div className={classes.textField}>
                                                <Typography variant="subtitle1"
                                                            className={classes.title}>
                                                    hashtag :
                                                </Typography>
                                                <Typography className={classes.caption}
                                                            variant="caption">
                                                    {rowData.job_details.hashtag}
                                                </Typography>
                                            </div>
                                            <div className={classes.textField}>
                                                <Typography variant="subtitle1"
                                                            className={classes.title}>
                                                    lang :
                                                </Typography>
                                                <Typography className={classes.caption}
                                                            variant="caption">
                                                    {rowData.job_details.lang}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className={classes.fields}>
                                            <div className={classes.textField}>
                                                <Typography variant="subtitle1"
                                                            className={classes.title}>
                                                    nearby place :
                                                </Typography>
                                                <Typography className={classes.caption}
                                                            variant="caption">
                                                    {rowData.job_details.near_place}
                                                </Typography>
                                            </div>
                                            <div className={classes.textField}>
                                                <Typography variant="subtitle1"
                                                            className={classes.title}>
                                                    not words :
                                                </Typography>
                                                <Typography className={classes.caption}
                                                            variant="caption">
                                                    {rowData.job_details.not_words}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className={classes.fields}>
                                            <div className={classes.textField}>
                                                <Typography variant="subtitle1"
                                                            className={classes.title}>
                                                    reply to :
                                                </Typography>
                                                <Typography className={classes.caption}
                                                            variant="caption">
                                                    {rowData.job_details.reply_to}
                                                </Typography>
                                            </div>
                                            <div className={classes.textField}>
                                                <Typography variant="subtitle1"
                                                            className={classes.title}>
                                                    target :
                                                </Typography>
                                                <Typography className={classes.caption}
                                                            variant="caption">
                                                    {rowData.job_details.target}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className={classes.fields}>
                                            <div className={classes.textField}>
                                                <Typography variant="subtitle1"
                                                            className={classes.title}>
                                                    target type :
                                                </Typography>
                                                <Typography className={classes.caption}
                                                            variant="caption">
                                                    {rowData.job_details.target_type}
                                                </Typography>
                                            </div>
                                            <div className={classes.textField}>
                                                <Typography variant="subtitle1"
                                                            className={classes.title}>
                                                    target subtype :
                                                </Typography>
                                                <Typography className={classes.caption}
                                                            variant="caption">
                                                    {rowData.job_details.target_subtype}
                                                </Typography>
                                            </div>
                                        </div>
                                    </PortletContent>
                                    <div className={classes.portletFooter}>
                                        <div className={classes.wrapper}>
                                            <div className={classes.analyticsButton}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    className={
                                                        this.state.success ? classes.buttonSuccess : ''
                                                    }
                                                    disabled={this.state.loading}
                                                    onClick={() => {
                                                        this.goToAnalysis(rowData);
                                                    }}
                                                >
                                                    Start Analytics
                                                </Button>
                                            {this.state.loading && (<CircularProgress size={24} className={classes.buttonProgress}/>) }
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
        this.setState({
            loading: true,
            success: false
        });
        const {history} = this.props;
        const url = this.props.match.url;
        localStorage.setItem('job', JSON.stringify(rowData));
        this.startAnalytics(rowData);
        // setTimeout(function () { //Start the timer
        //     this.setState({
        //         loading: false,
        //         success: true
        //     }, () => {
        //         history.push(url + '/analysis', {
        //             type: rowData.job_details.target_subtype,
        //             target_type: rowData.job_details.target_type
        //         });
        //     });
        // }.bind(this), 2000);

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

    handleToggleStatus(id) {
        const {user, project_id, jobs} = this.state;
        try {
            request({
                url: endpoints.getProjectJobs + '/' + id,
                method: 'PUT',
                headers: {
                    user_id: user.id,
                    x_auth_token: user.x_auth_token.token,
                    project_id: project_id
                }
            }).then((res) => {
                    this.setState({
                        jobs: jobs.map(el => (el.id === res.id ?
                            Object.assign({}, el, {status: res.status , next_run_scheduled_at: res.next_run_scheduled_at})
                            : el))
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
        history.push('/dashboard/project/previous_tasks',{taskId: this.state.taskId,jobName: rowData.description});

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

