import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';


// Material helpers
import {Button, Divider, LinearProgress, TableCell, Typography, withStyles} from '@material-ui/core';

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

// local json
import hatePoolTwitterProfiles
    from '../../JobAnalysis/data/500_hate_pool_TWITTER_USER_POST_2019-09-21.json';

// Shared components
import {
    Portlet,
    PortletHeader,
    PortletLabel,
    PortletContent,
    PortletFooter
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
import Avatar from "@material-ui/core/Avatar";
import {lighten} from "@material-ui/core/styles";
import theme from "../../../../../../../theme";


const BorderLinearProgress = withStyles({
    root: {
        height: 10,
        backgroundColor: lighten('#ff6c5c', 0.5),
    },
    bar: {
        borderRadius: 20,
        backgroundColor: theme.palette.danger.main,
    },
})(LinearProgress);
class ProfilesTable extends Component {
    signal = false;

    state = {
        isLoading: false,
        profiles: []
    };

    async getMonitorJobs() {
        this.setState({
            profiles: hatePoolTwitterProfiles
        })
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
        const {isLoading, profiles} = this.state;

        const rootClassName = classNames(classes.root, className);
        const showProfiles = !isLoading && profiles;

        const normalise = (value,min,max) => (value - min) * 100 / (max - min);
        return (
            <div className={rootClassName}>
                {isLoading && (
                    <div className={classes.progressWrapper}>
                        <CircularProgress/>
                    </div>
                )}
                {showProfiles && (
                    <MaterialTable
                        columns={[
                            {title: 'User Name', field: 'user_name',
                                render: rowData => <Typography variant="h6" className={classes.user_name}> <Avatar  src={rowData.user_avatar}/> <div className={classes.title}>{rowData.user_name}</div></Typography>
                            },
                            {title: 'Screen Name', field: 'user_screen_name'},
                            {
                                title: 'Hate Bar',
                                field: 'freq',
                                render: rowData => <div>
                                    <BorderLinearProgress
                                        className={classes.margin}
                                        variant="determinate"
                                        color="primary"
                                        value={normalise(rowData.freq,0,10)}
                                    />
                                </div>
                            },
                        ]}
                        data={this.state.profiles}
                        title="Profiles"
                        onRowClick={(event, rowData, togglePanel) => this.goToAnalysis(rowData)}
                        options={{
                            search: true,
                            paging: true,
                            actionsColumnIndex: -1,
                            exportButton: true
                        }}

                    />
                )}
            </div>
        );
    }

    goToAnalysis() {
        const { history } = this.props;
        history.push('/dashboard/project/analysis',{type: 'INFO' , target_type: 'USER'});
    }

}

ProfilesTable.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired

};

export default compose(
    withRouter,
    withStyles(styles)
)
(ProfilesTable);
