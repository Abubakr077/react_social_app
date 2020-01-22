import React, { Component } from 'react';
// Externals
import classNames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';
// Material helpers
// Material components
import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';
// Shared components
import { Portlet, PortletContent, PortletHeader, PortletLabel } from 'components';
// Component styles
import styles from './styles';
import { toast } from 'react-toastify';
import { Message, optionsError, optionsSuccess } from 'constants/constants';
import request from 'helpers/request.js';
import * as endpoints from 'constants/endpoints.json';
import { Delete as DeleteIcon } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import confirm from 'helpers/confirmation.js';
import compose from 'recompose/compose';


class SentInvitesTable extends Component {
  signal = false;

  state = {
    isLoading: false,
    limit: 10,
    invites: [],
    tempInvite: {
      invite: null,
      isUpdate: null
    }
  };

  constructor(props) {
    super(props);
    this.setState({
      tempInvite: {
        invite: props.invite,
        isUpdate: props.isUpdate
      }
    });
  }

  async getMonitorUsers(limit) {
    this.setState({ isLoading: true });

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
      toast.error(<Message name={error.data}/>, optionsError);
      this.setState({
        isLoading: false
      });
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props !== nextProps) {
      if (nextProps.tempInvite) {
        if (nextProps.tempInvite.invite) {
          const { invites } = this.state;
          if (nextProps.tempInvite.isUpdate) {
            this.setState({
              invites: invites.map(el => (el.invitee_email === nextProps.tempInvite.invite.invitee_email ?
                Object.assign({}, el, nextProps.tempInvite.invite)
                : el))
            });
            this.props.handler();
          } else {
            this.setState({ invites: [...this.state.invites, nextProps.tempInvite.invite] });
            this.props.handler();
          }
        }
      }
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
              <CircularProgress/>
            </div>
          )}
          {showUsers && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Invitee Email</TableCell>
                  <TableCell>Invited On</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
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
                    <TableCell>
                      <IconButton
                        className={classes.deleteButton}
                        onClick={() => {
                          this.handleCancelInvite(invite);
                        }}
                      >
                        <DeleteIcon/>
                      </IconButton>
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

  handleCancelInvite(invite) {

    confirm('Are you sure you want to cancel this invite ?').then(
      (result) => {
        // `proceed` callback
        this.DeleteInvite(invite);
      },
      (result) => {
        // `cancel` callback
      }
    );
  }

  async DeleteInvite(invite) {
    const { invites } = this.state;
    const user = JSON.parse(localStorage.getItem('user'));
    const project_id = localStorage.getItem('project_id');
    this.setState({
      isLoading: true
    });
    try {
      await request({
        url: endpoints.cancelInvite + invite.id,
        method: 'DELETE',
        headers: {
          user_id: user.id,
          x_auth_token: user.x_auth_token.token,
          project_id: project_id
        }
      }).then(() => {
          this.setState({
            invites: invites.filter(item => item.id !== invite.id),
            isLoading: false
          });
          toast.success(<Message name={'Invite Cancelled Successfully'}/>, optionsSuccess);
        }
      );
    } catch (error) {
      toast.error(<Message name={error.data}/>, optionsError);
      this.setState({
        isLoading: false
      });
    }
  }
}

SentInvitesTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};


export default compose(
  withStyles(styles)
)
(SentInvitesTable);
