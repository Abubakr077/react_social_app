import React, {Component} from 'react';
// Externals
import classNames from 'classnames';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';


// Material helpers
import {Divider, TableCell, Typography, withStyles} from '@material-ui/core';

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
} from 'components';
import MaterialTable from "material-table";
import TextField from "@material-ui/core/TextField";
import {toast} from "react-toastify";
import {Message, optionsError, optionsSuccess} from "../../../../../../../constants/constants";

import request from 'helpers/request.js';
import * as endpoints from 'constants/endpoints.json';
import * as constants from 'constants/constants.js';
import confirm from 'helpers/confirmation.js';
import compose from "recompose/compose";
import {connect} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
class MonitoringJobsTable extends Component {
    signal = false;

    state = {
        isLoading: false,
        user: null,
        project_id: null,
        jobs: []
    };

    async getMonitorJobs() {
        try {

            this.setState({isLoading: true});
            const user = JSON.parse(localStorage.getItem('user'));
            const project_id = localStorage.getItem('project_id');
            this.setState({
               user: user,
               project_id: project_id
            });
            await request({
                url: endpoints.getProjectJobs,
                method: 'GET',
                headers: {
                    user_id: user.id,
                    x_auth_token: user.x_auth_token.token,
                    project_id: project_id
                }
            }).then((res) => {
                localStorage.setItem('jobs', JSON.stringify(res.monitoring_jobs));
                if (this.signal) {
                    this.setState({
                        isLoading: false,
                        jobs: res.monitoring_jobs
                    });
                }
            });
        } catch (error) {
            toast.error(<Message name={error.data}/>,optionsError);
            if (this.signal) {
                this.setState({
                    isLoading: false,
                    error
                });
            }
        }
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
        const {isLoading, jobs} = this.state;

        const rootClassName = classNames(classes.root, className);
        const showJobs = !isLoading && jobs;

        return (
            <div className={rootClassName}>
                {isLoading && (
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
                                icon: ()=>
                                    <div className={classes.deleteIcon}>
                                    <DeleteIcon />
                                </div>,
                                onClick: (event, rowData) => {
                                    confirm('Are you sure you want to delete '+rowData.description+' ?').then(
                                        (result) => {
                                            // `proceed` callback
                                            this.setState({
                                                isLoading: true
                                            });
                                            this.handleDelete(rowData.id);
                                        },
                                        (result) => {
                                            // `cancel` callback
                                        }
                                    )
                                }
                            }),
                            rowData => ({
                                icon: ()=>{
                                    if (rowData.status === "ACTIVE"){
                                        return (
                                            <div className={classes.blueIcon}>
                                            <PauseIcon />
                                        </div>)
                                    } return (
                                        <div className={classes.greenIcon}>
                                        <PlayIcon />
                                    </div>)
                                } ,
                                onClick: (event, rowData) => {
                                    this.handleToggleStatus(rowData.id);
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
                                            title="Job Details"
                                        />
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
                                </Portlet>
                            )
                        }}
                        onRowClick={(event, rowData, togglePanel) => togglePanel()}
                    />
                )}
            </div>
        );
    }

    handleDelete(id) {
        const {user,project_id,jobs} = this.state;
        const endpoint = endpoints.getProjectJobs+'/'+id+'?force=1';

        try{
            request({
                url:    endpoint,
                method: 'DELETE',
                headers: {
                    user_id: user.id,
                    x_auth_token: user.x_auth_token.token,
                    project_id: project_id
                }
            }).then(() => {
                this.setState({
                    jobs: jobs.filter(job=> job.id !== id),
                    isLoading: false
                });
                toast.success(<Message name={'Job Deleted Successfully'}/>,optionsSuccess);
                }
            );
        }catch (error) {
            toast.error(<Message name={error.data}/>, optionsError);
        }
    }
    handleToggleStatus(id) {
        const {user,project_id,jobs} = this.state;
        try{
            request({
                url:    endpoints.getProjectJobs+'/'+id,
                method: 'PUT',
                headers: {
                    user_id: user.id,
                    x_auth_token: user.x_auth_token.token,
                    project_id: project_id
                }
            }).then((res) => {
                this.setState({
                    jobs: jobs.map(el => (el.id === res.id ?
                        Object.assign({}, el, { status: res.status })
                        : el))
                });
                toast.success(<Message name={'Job Updated Successfully'}/>,optionsSuccess);
                }
            );
        }catch (error) {
            toast.error(<Message name={error.data}/>, optionsError);
        }
    }
}

MonitoringJobsTable.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

export default
compose(
    withStyles(styles)
)
(MonitoringJobsTable);
