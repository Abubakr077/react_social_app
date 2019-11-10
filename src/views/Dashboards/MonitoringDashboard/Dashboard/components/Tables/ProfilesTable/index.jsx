import React, {Component} from 'react';
import {  withRouter } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';


// Material helpers
import {LinearProgress,  Typography, withStyles} from '@material-ui/core';

// Material components
import {
    CircularProgress
} from '@material-ui/core';

// Component styles
import styles from './styles';


// Shared components
import MaterialTable from "material-table";

import compose from "recompose/compose";
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

        const {data} = this.props;
        this.setState({
            profiles: data
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
                                render: rowData => <Typography   variant="h6" className={classes.user_name}>
                                    <Avatar  src={rowData.user_avatar} className={classes.bigAvatar}/> <div className={classes.title}>{rowData.user_name}</div>
                            </Typography>
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
                            exportButton: true,
                            exportAllData: true
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
