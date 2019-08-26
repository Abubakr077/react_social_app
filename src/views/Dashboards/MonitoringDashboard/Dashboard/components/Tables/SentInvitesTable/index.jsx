import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';


// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';


// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
} from 'components';

// Component styles
import styles from './styles';
import {toast} from "react-toastify";
import {Message, optionsError, optionsSuccess} from "../../../../../../../constants/constants";
import request from 'helpers/request.js';
import * as endpoints from 'constants/endpoints.json';


class SentInvitesTable extends Component {
  signal = false;

  state = {
    isLoading: false,
    limit: 10,
    invites: []
  };

  async getMonitorUsers(limit) {
    this.setState({isLoading: true});

    const user = JSON.parse(localStorage.getItem('user'));
    const project_id = localStorage.getItem('project_id');

    try {
      await request({
        url: endpoints.sentInviteStatus,
        method: 'GET',
        headers: {
          user_id: user.id,
          x_auth_token: user.x_auth_token.token,
          project_id: project_id
        }
      }).then((res) => {
        this.setState({
          isLoading: false,
          invites: res.sent_invites
        });
      });
    } catch (error) {
      toast.error(<Message name={error.data}/>,optionsError);
      this.setState({
        isLoading: false
      });
    }
  }

  componentDidMount() {
    this.signal = true;

    const { limit } = this.state;

    this.getMonitorUsers(limit);
  }

  componentWillUnmount() {
    this.signal = false;
  }

  render() {
    const { classes, className } = this.props;
    const { isLoading, invites } = this.state;

    const rootClassName = classNames(classes.root, className);
    const showUsers = !isLoading && invites;

    return (
      <Portlet className={rootClassName}>
        <PortletHeader noDivider>
          <PortletLabel
            title="Sent Invites Status"
          />
        </PortletHeader>
          <PortletContent
            className={classes.portletContent}
            noPadding
          >
            {isLoading && (
              <div className={classes.progressWrapper}>
                <CircularProgress />
              </div>
            )}
            {showUsers && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Invitee Email</TableCell>
                    <TableCell >Invited On</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invites.map(invite => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={invite.id}
                    >
                      <TableCell>{invite.invitee_email}</TableCell>
                      <TableCell>
                        {moment(invite.invited_on).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        {invite.role}
                      </TableCell>
                      <TableCell>
                        {invite.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </PortletContent>
      </Portlet>
    );
  }
}

SentInvitesTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SentInvitesTable);
