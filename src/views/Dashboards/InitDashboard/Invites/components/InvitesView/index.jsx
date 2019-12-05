import React, {Component} from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Material helpers
import {
    CardActions,
    CircularProgress,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    withStyles
} from '@material-ui/core';

// Material components
import {Typography} from '@material-ui/core';


// Shared components
import {Card} from '../index';

// Component styles
import styles from './styles';
import NoRecords from "../../../../../NoRecords"
import {statusColors} from 'constants/constants.js';
import {Status} from 'components';
import compose from "recompose/compose";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import {Message, optionsError, optionsSuccess} from "../../../../../../constants/constants";

import request from 'helpers/request.js';
import * as endpoints from 'constants/endpoints.json';
class InvitesView extends Component {
    signal = false;
    showInvites = false;

    state = {
        isLoading: false,
        invites: []
    };


    async getInvites() {
        try {

            this.setState({isLoading: true});
            const user = JSON.parse(localStorage.getItem('user'));
            await request({
                url: endpoints.getProjectInvites,
                method: 'GET',
                headers: {
                    user_id: user.id,
                    x_auth_token: user.x_auth_token.token
                }
            }).then((res) => {
                localStorage.setItem('invites', JSON.stringify(res.project_invites));
                if (this.signal) {
                    this.setState({
                        isLoading: false,
                        invites: res.project_invites
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
    };

    componentDidMount() {
        this.signal = true;

        const {limit} = this.state;

        this.getInvites(limit);
    }

    componentWillUnmount() {
        this.signal = false;
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props !== nextProps) {
            this.setState({
                invites: nextProps.invites
            }, () => {
                localStorage.setItem('invites', JSON.stringify(nextProps.invites));
            });
        }
    }

    render() {
        const {classes, className, ...rest} = this.props;
        const rootClassName = classNames(classes.root, className);
        const {isLoading, invites} = this.state;
        this.showInvites = !isLoading && invites.length;
        if (!this.showInvites) {
            return (
                <div>
                    {isLoading && (
                        <div className={classes.progressWrapper}>
                            <CircularProgress/>
                        </div>
                    )}
                    {!isLoading && (
                        < NoRecords title={'No Invites at this moment'}
                                    subTitle={'Invites will show, if some owner send you one'}/>
                    )}
                </div>
            )
        }
        return (

            <div className={rootClassName}>
                <div>
                    <div
                        className={classes.portletContent}
                    >
                        {this.showInvites && (
                            <Grid
                                container
                                spacing={4}
                            >
                                {
                                    invites.map(invite => (
                                        <Grid
                                            item
                                            lg={3}
                                            sm={4}
                                            xl={3}
                                            xs={6}
                                        >
                                            <Card
                                                {...rest}
                                                invite={invite}
                                            >
                                                <div className={classes.details}>
                                                    <Typography
                                                        className={classes.title}
                                                        variant="h3"
                                                    >
                                                        {invite.project.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        className={classes.caption}
                                                    >
                                                        {invite.role}
                                                    </Typography>
                                                  <Typography
                                                      variant="caption"
                                                      className={classes.caption}
                                                  >
                                                    {invite.invitee_email}
                                                  </Typography>
                                                    <Typography
                                                    >
                                                        <div className={classes.statusWrapper}>
                                                            <Status
                                                                className={classes.status}
                                                                color={statusColors[invite.status]}
                                                                size="sm"
                                                            />
                                                            {invite.status}
                                                        </div>
                                                    </Typography>
                                                </div>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        )}
                    </div>
                </div>
            </div>
        );

    }
}

InvitesView.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        invites: state.invites
    }
};
export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(InvitesView);
