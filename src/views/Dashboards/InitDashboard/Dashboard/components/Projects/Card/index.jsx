import React, {Fragment} from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import {CardActions, withStyles} from '@material-ui/core';

// Material components
import {
  Card ,
  IconButton,
  Button
}from "@material-ui/core";

import {
  Delete as DeleteIcon,
  // FirstPageOutlined as RemoveIcon,
  ExitToAppOutlined as RemoveIcon,
} from '@material-ui/icons';


import * as color from "common/colors";
import * as endPoints from 'constants/endpoints.json';
import * as constants from 'constants/constants.js';
import request from 'helpers/request.js';
import { toast } from 'react-toastify';
import {connect} from "react-redux";
import compose from "recompose/compose";
import {Message, optionsSuccess} from "constants/constants";


// Component styles
const styles = theme => {
  return {
    root: {
      cursor: 'pointer',
      borderRadius: '8px',
      minHeight: 140
    }
    ,
    squared: {
      borderRadius: '10px'
    },
    outlined: {
      border: `1px  ${theme.palette.border}`
    },
    button: {
      minHeight: 140
    },
    newCardButton: {
      minHeight: 200
    },
    customIcon: {
      color: color.white,
      hover: false
    },
    cardActions: {
      right: 'auto',
      float: 'right'
    },
    actionDiv: {
      width: '100%'
    },
    deleteIcon: {
      color: color.red
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
      newCard,
      cardProject,
      ...rest } = props;

  let delError = null;
  const rootClassName = classNames(
    {
      [classes.root]: true,
      [classes.squared]: squared,
      [classes.outlined]: outlined
    },
    className
  );

    function handleDelete() {
        const   user   = JSON.parse(localStorage.getItem('user'));
        const projects   = JSON.parse(localStorage.getItem('projects'));
        const id = cardProject.project.id;
        try{
            request({
                url:    endPoints.deleteProject,
                method: 'DELETE',
                headers: {
                    user_id: user.id,
                    x_auth_token: user.x_auth_token.token,
                    project_id: id
                }
            }).then((res) => {
                    props.dispatch({
                        type: constants.DELETE_PROJECT,
                        projects,
                        id
                    });
                    if (cardProject.role === 'OWNER'){
                        toast.success(<Message name={'Project Deleted Successfully'}/>,optionsSuccess);
                    }else {
                        toast.success(<Message name={'Project Removed Successfully'}/>,optionsSuccess);
                    }
            }
            );
        }catch (error) {
            console.error(error);
            toast.error(error.data);
            delError = error.data
        }
    }

    return (
        <Fragment>
      <Card
      {...rest}
      className={rootClassName}
    >
        <Button fullWidth={true} className={newCard? classes.newCardButton : classes.button}>
        {children}
        </Button>

        {!newCard && (
            <div className={classes.actionDiv}>
            < CardActions className={classes.cardActions}>
              {cardProject.role !== 'OWNER' && (
              <div >
                  <IconButton onClick={handleDelete}>
                <RemoveIcon  />
              </IconButton >
              </div>
              )}
              {cardProject.role === 'OWNER' && (
              <div >
                <IconButton onClick={handleDelete}>
                  <DeleteIcon className={classes.deleteIcon} />
                </IconButton>
              </div>
              )}
            </CardActions>
            </div>
        )}

    </Card>
        </Fragment>
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
        projects: state.projects
    }
};
export default
compose(
    connect(mapStateToProps),
    withStyles(styles)
)
(CustomCard);
