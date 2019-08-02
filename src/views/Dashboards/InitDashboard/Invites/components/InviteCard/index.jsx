import React from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import {CardActions, withStyles} from '@material-ui/core';

// Material components
import {
  Card ,
  CardContent,
  IconButton,
  Button
}from "@material-ui/core";

import {
  CloseOutlined as CancelIcon,
  Check as CheckIcon
} from '@material-ui/icons';

import * as color from 'common/colors';
import * as endPoints from 'constants/endpoints.json';
import request from 'helpers/request.js';
import { toast } from 'react-toastify';
import * as constants from "constants/constants";
import {connect} from "react-redux";
import compose from "recompose/compose";
import {Message, optionsSuccess} from "constants/constants";

// Component styles
const styles = theme => {
  return {
    root: {
      borderRadius: '8px',
      minHeight: 198,
      maxHeight: 198,
      minWidth: 276,
      maxWidth: 276,
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      marginRight: '300px',
    }
    ,
    squared: {
      borderRadius: '10px'
    },
    outlined: {
      border: `1px  ${theme.palette.border}`
    },
    cardActions: {
      marginLeft: 'auto',
      marginTop: theme.spacing(1)
    },
    acceptButton: {
      color: color.green,
      width: 25,
      height: 25
    },
    cancelButton: {
      color: color.red,
      width: 25,
      height: 25
    }
  };
};

const CustomCard = props => {
  const {
    classes,
    className,
    outlined,
    squared,
    children,
    invite,
    ...rest } = props;
  const rootClassName = classNames(
    {
      [classes.root]: true,
      [classes.squared]: squared,
      [classes.outlined]: outlined
    },
    className
  );


  const handleAcceptInvite = action =>{

    let endPoint=null, method= null;
    if (action === 'accept'){
      endPoint = endPoints.acceptInvite + '/' + invite.id;
      method = 'POST';
    }else {
      endPoint = endPoints.rejectInvite + '/' + invite.id;
      method = 'DELETE';
    }
    const   user   = JSON.parse(localStorage.getItem('user'));
    const invites   = JSON.parse(localStorage.getItem('invites'));

    try {
      request({
        url: endPoint ,
        method: method,
        headers: {
          user_id: user.id,
          x_auth_token: user.x_auth_token.token
        }
      }).then((res)=>{
        props.dispatch({
          type: constants.DELETE_INVITE,
          invites,
          invite
        });
        toast.success(<Message name={res}/>,optionsSuccess);
      });

    }catch (e) {
      console.error(e);
      toast.success(e.data);
    }
  };

  return (
      <Card
      {...rest}
      className={rootClassName}
    >
        {children}
            < CardActions >
              <div className={classes.cardActions}>
                <IconButton onClick={()=>handleAcceptInvite('reject')}>
                <CancelIcon className={classes.cancelButton}/>
              </IconButton>
                <IconButton onClick={()=>handleAcceptInvite('accept')}>
                  <CheckIcon className={classes.acceptButton} />
                </IconButton>
              </div>
            </CardActions>

    </Card>
  );


};

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
  }
};
export default
compose(
    connect(mapStateToProps),
    withStyles(styles)
)
(CustomCard);
