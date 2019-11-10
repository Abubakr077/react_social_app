import React, {Component} from 'react';
// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
// Material helpers
import {
    CircularProgress,
    Grid,
    withStyles
} from '@material-ui/core';

import {
    Dashboard as DashboardLayout

} from 'layouts';
// Component styles
import styles from './styles';
import Typography from '@material-ui/core/Typography';
// Shared components
import {
    Portlet,
    PortletHeader,
    PortletFooter,
    PortletContent
} from 'components';
import ProfileBar from "../Graphs/ProfilesBar";
import ProfilesTable from "../Tables/ProfilesTable";
import {toast} from "react-toastify";
import {Message, optionsError} from "../../../../../../constants/constants";
import request from 'helpers/request.js';
import * as endpoints from 'constants/endpoints.json';
import NoRecords from "../../../../../NoRecords";
import hatePoolTwitterProfiles
    from '../JobAnalysis/data/500_hate_pool_TWITTER_USER_POST_2019-09-21.json';
import ProfilesNetwork from "../Graphs/ProfilesNetwork";



class TrendHatePool extends Component {

    signal = false;

    state = {
        isLoading: false,
        data: []
    };


    async getHatePool() {
        this.prevState = this.props.location.state;
        try {

            this.setState({isLoading: true});
            const user = JSON.parse(localStorage.getItem('user'));
            const project_id = localStorage.getItem('project_id');

            await request({
                url: endpoints.getHatePool+this.prevState.taskId,
                method: 'GET',
                headers: {
                    user_id: user.id,
                    x_auth_token: user.x_auth_token.token,
                    project_id: project_id
                }
            }).then((res) => {
                if (this.signal) {
                    this.setState({
                        isLoading: false,
                        data: res
                    });
                }
            });
        } catch (error) {
            toast.error(<Message name={error.data}/>,optionsError);
            if (this.signal) {
                this.setState({
                    isLoading: false,
                    error,
                    data: hatePoolTwitterProfiles
                });
            }
        }
    };

    componentDidMount() {
        this.signal = true;

        this.getHatePool();
    }

    componentWillUnmount() {
        this.signal = false;
    }
    render() {

        const {classes, className, ...rest} = this.props;
        const rootClassName = classNames(classes.root, className);
        const prevState = this.props.location.state;
        const {isLoading, data} = this.state;
        const show = !isLoading && data.length;
        return (
            <DashboardLayout className={rootClassName}
                             title={ " PROFILES"}
                             initUser={false}
                             options={{
                                 isTweetsRoute: true
                             }}
            >

                {show ? (
                    <div className={classes.root}>
                    <Portlet >
                        <PortletHeader noDivider>
                            <Typography variant="h2"> Profiles</Typography>
                        </PortletHeader>
                        <PortletContent
                            noPadding
                        >
                            <Grid
                                item
                                xs={12}
                                className={classes.barGrapth}
                            >
                                <ProfileBar data={data}/>
                            </Grid>
                        </PortletContent>
                    </Portlet>
                    <Grid
                        item
                        xs={12}
                        className={classes.marginTable}
                    >
                        <ProfilesTable data={data}/>
                    </Grid>
                        <Grid
                            item
                            xs={12}
                            className={classes.marginTable}>
                            <ProfilesNetwork/>
                        </Grid>
                </div>) : (
                    <div>
                        {isLoading && (
                            <div className={classes.progressWrapper}>
                                <CircularProgress/>
                            </div>
                        )}
                        {!isLoading && (
                            < NoRecords title={'No Hate Profiles Present Against this Job'}/>
                        )}
                    </div>
                )}
            </DashboardLayout>
        );
    }


}

TrendHatePool.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TrendHatePool);
