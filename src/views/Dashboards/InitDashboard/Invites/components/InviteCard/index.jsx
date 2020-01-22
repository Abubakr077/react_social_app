import React, { Component } from 'react';
// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';
// Material helpers
// Material components
import { Card, CardActions, IconButton, withStyles } from '@material-ui/core';

import { Check as CheckIcon, CloseOutlined as CancelIcon } from '@material-ui/icons';
import * as endPoints from 'constants/endpoints.json';
import request from 'helpers/request.js';
import { toast } from 'react-toastify';
import * as constants from 'constants/constants';
import { Message, optionsSuccess } from 'constants/constants';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { optionsError } from '../../../../../../constants/constants';
// Component styles
import styles from './styles';

import confirm from 'helpers/confirmation.js';

class CustomCard extends Component {
  render() {
    const {
      classes,
      className,
      outlined,
      squared,
      children,
      invite,
      ...rest
    } = this.props;
    const rootClassName = classNames(
      {
        [classes.root]: true,
        [classes.squared]: squared,
        [classes.outlined]: outlined
      },
      className
    );


    const handleAcceptInvite = action => {

      let endPoint = null, method = null;
      let confirmationString = '';
      if (action === 'accept') {
        endPoint = endPoints.acceptInvite + '/' + invite.id;
        method = 'POST';
        confirmationString = 'Are you sure you want to accept ';
      } else {
        endPoint = endPoints.rejectInvite + '/' + invite.id;
        method = 'DELETE';
        confirmationString = 'Are you sure you want to cancel ';
      }
      const user = JSON.parse(localStorage.getItem('user'));
      const invites = JSON.parse(localStorage.getItem('invites'));

      confirm(confirmationString + invite.invitee_email + ' invite for ' + invite.project.name + ' ?').then(
        (result) => {
          // `proceed` callback
          try {
            request({
              url: endPoint,
              method: method,
              headers: {
                user_id: user.id,
                x_auth_token: user.x_auth_token.token
              }
            }).then((res) => {
              this.props.dispatch({
                type: constants.DELETE_INVITE,
                invites,
                invite
              });
              toast.success(<Message name={res}/>, optionsSuccess);
            });

          } catch (e) {
            toast.error(<Message name={e.data}/>, optionsError);
          }
        },
        (result) => {
          console.log(invite);
        }
      );

    };

    return (
      <Card
        {...rest}
        className={rootClassName}
      >
        {children}
        < CardActions>
          <div className={classes.cardActions}>
            <IconButton onClick={() => handleAcceptInvite('reject')}>
              <CancelIcon className={classes.cancelButton}/>
            </IconButton>
            <IconButton onClick={() => handleAcceptInvite('accept')}>
              <CheckIcon className={classes.acceptButton}/>
            </IconButton>
          </div>
        </CardActions>

      </Card>
    );


  }
}

CustomCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  elevation: PropTypes.number,
  outlined: PropTypes.bool,
  squared: PropTypes.bool
};

CustomCard.defaultProps = {
  squared: false,
  outlined: true,
  elevation: 1
};
const mapStateToProps = (state, ownProps) => {
  return {
    invites: state.invites
  };
};
export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)
(CustomCard);
