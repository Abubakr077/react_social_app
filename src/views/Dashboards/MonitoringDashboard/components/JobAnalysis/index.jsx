import React, {Component} from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import {
    CircularProgress, Grid,
    withStyles
} from '@material-ui/core';

import {
    Dashboard as DashboardLayout

} from 'layouts';

// Shared components
import {
    Portlet,
    PortletHeader,
    PortletLabel,
    PortletContent,
    PortletToolbar
} from 'components';

// Component styles
import styles from './styles';

// Shared Resources
import compose from "recompose/compose";
import PNTweetsLine from "../Graphs/PNTweetsLine";
import PNTweetsPie from "../Graphs/PNTweetsPie";
import {WordClouds} from "../index";
import PNTweetsArea from "../Graphs/PNTweetsArea";
import AccountProfile from "../AccountProfile";
import Button from "@material-ui/core/Button";
import {withRouter} from "react-router-dom";
import NoRecords from "../../../../NoRecords";
import {toast} from "react-toastify";
import {Message, optionsError} from "../../../../../constants/constants";
import * as endpoints from 'constants/endpoints.json';
import request from 'helpers/request.js';

class JobAnalysis extends Component {

    state = {
        isLoading: false,
        data: null,
        isWordFreqEmpty: false,
        isPolarityFreqEmpty: false,
        isPolarityDistEmpty: false,
        isAssocEmpty: false,
        isAccountEmpty: false
    };
    async getMonitorData(id) {
        try {
            this.setState({
                isLoading: true,
            });
            await request({
                url: endpoints.resultAnalysis + id,
                method: 'GET',
                headers: {
                    user_id: this.user.id,
                    x_auth_token: this.user.x_auth_token.token,
                    project_id: this.project_id
                }
            }).then((res) => {
                if (this.signal) {
                    if (res.results ){
                        this.setState({
                        isWordFreqEmpty : Boolean(Object.keys(res.results.unique_word_freq).length),
                        isPolarityFreqEmpty : Boolean(Object.keys(res.results.polarity_freq).length),
                        isPolarityDistEmpty : Boolean(Object.keys(res.results.polarity_dist).length),
                        isAssocEmpty : Boolean(Object.keys(res.results.assoc).length)
                        });
                    }
                    if (res.info_data){
                        this.setState({
                            isAccountEmpty: Boolean(Object.keys(res.info_data).length)
                        });
                    }
                    this.setState({
                        isLoading: false,
                        data: res
                    });
                }
            });
        } catch (error) {
            if (this.signal) {
                console.error(error);
                toast.error(<Message name={error.data}/>, optionsError);
                this.setState({
                    isLoading: false,
                    error
                });
            }
        }
    }


    componentWillUnmount() {
        this.signal = false;
    }
    componentDidMount() {
        this.signal = true;
        window.scrollTo(0, 0);
        this.user = JSON.parse(localStorage.getItem('user'));
        this.project_id = localStorage.getItem('project_id');
        this.prevState = this.props.location.state;
        if (this.prevState){
            if (this.prevState.taskId){
                this.getMonitorData(this.prevState.taskId);
            }
        }
    }
    render() {
        const {classes, className, ...rest} = this.props;
        const rootClassName = classNames(classes.root, className);
        const job = JSON.parse(localStorage.getItem('job'));
        let showAnalytics = !this.state.isLoading && this.state.data;
        if (showAnalytics){
            showAnalytics = this.state.data.info_data && this.state.data.results;
        }
        const title = "Analysis of " + job.description;
        return (
            <DashboardLayout className={rootClassName}
                             title={title}
                             initUser={false}>
                {this.state.isLoading ? (
                    <div className={classes.progressWrapper}>
                        <CircularProgress/>
                    </div>
                ) : (
                   showAnalytics ?
                    (<div className={classes.root}>
                {this.state.isAccountEmpty && (
                    <AccountProfile data={this.state.data.info_data}/>
                    )}
                {this.state.data.results && (
                    <div>
                        {this.state.isPolarityFreqEmpty && (<Portlet>
                            <PortletHeader noDivider>
                                <PortletLabel
                                    title="Twitter Tweets"
                                />
                                { this.prevState.target_type === 'TREND' && (<PortletToolbar>
                                    <Button
                                        className={classes.newEntryButton}
                                        color="primary"
                                        size="small"
                                        variant="outlined"
                                        onClick={()=> {
                                            const { history } = this.props;
                                            const url = this.props.match.url;
                                            history.push(url+'/hate_pool',{taskId:this.prevState.taskId});
                                        }}
                                    >
                                        Hate Pool
                                    </Button>
                                    <Button
                                        className={classes.newEntryButton}
                                        color="primary"
                                        size="small"
                                        variant="outlined"
                                        onClick={()=> {
                                            const { history } = this.props;
                                            const url = this.props.match.url;
                                            history.push(url+'/compare',{polarity_dist:this.state.data.results.polarity_dist});
                                        }}
                                    >
                                        Compare
                                    </Button>
                                    <Button
                                        className={classes.newEntryButton}
                                        color="primary"
                                        size="small"
                                        variant="outlined"
                                        onClick={()=> {
                                            const { history } = this.props;
                                            const url = this.props.match.url;
                                            history.push(url+'/hate_pool');
                                        }}
                                    >
                                        Trend Contributors
                                    </Button>
                                </PortletToolbar>)
                                }
                            </PortletHeader>
                            <PortletContent
                                className={classes.contentBody}
                                noPadding
                            >
                                {this.state.isPolarityFreqEmpty && <div className={classes.lineBody}>
                                    <PNTweetsLine data={this.state.data.results.polarity_freq}
                                                  type={this.prevState.type}
                                                  target_type={this.prevState.target_type}
                                                  taskId= {this.prevState.taskId}
                                    />
                                </div>}
                                {this.state.isPolarityDistEmpty &&
                                <div className={classes.pieBody}>
                                    <PNTweetsPie data={this.state.data.results.polarity_dist} type={this.prevState.type} target_type={this.prevState.target_type}/>
                                </div>}
                            </PortletContent>
                            { this.state.isPolarityFreqEmpty && <div className={classes.areaBody}>
                                <PNTweetsArea  data={this.state.data.results.polarity_freq}/>
                            </div>}
                        </Portlet>)}
                    {this.state.isAssocEmpty && (
                        <Grid
                            item
                            xs={12}
                        >
                            <WordClouds cloudOptions={{
                                isWords: false,
                                title: 'Associations Cloud',
                                data: this.state.data.results.assoc,
                                target_type: this.prevState.target_type,
                                type: this.prevState.type,
                                taskId: this.prevState.taskId
                            }
                            }
                            />
                        </Grid>
                    )}
                    {this.state.isWordFreqEmpty && <Grid
                        item
                        xs={12}
                    >
                        <WordClouds cloudOptions={{
                            isWords: true,
                            title: 'Unique Words Frequency',
                            data: this.state.data.results.unique_word_freq,
                            target_type: this.prevState.target_type,
                            type: this.prevState.type
                        }}/>
                    </Grid>}
                    </div>
                    )
                }
                    </div>) : (
                        <NoRecords
                           title={'No Analytical Data to show at this moment'}
                       />
                       )
                )
                }
            </DashboardLayout>
        );
    }
}


JobAnalysis.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};


export default compose(
    withRouter,
    withStyles(styles)
)
(JobAnalysis);

