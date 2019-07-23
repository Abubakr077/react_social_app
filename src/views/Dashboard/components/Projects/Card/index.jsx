import React from 'react';

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
  ExitToAppOutlined as RemoveIcon,
} from '@material-ui/icons';


import * as color from "../../../../../common/colors";

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
        position: 'relative',
        right: 'auto',
    },
    deleteIcon: {
      color: color.red,
    }
  };
};

const CustomCard = props => {
  const { classes, className, outlined, squared, children,newCard, ...rest } = props;


  const rootClassName = classNames(
    {
      [classes.root]: true,
      [classes.squared]: squared,
      [classes.outlined]: outlined
    },
    className
  );


  return (
      <Card
      {...rest}
      className={rootClassName}
    >
        <Button fullWidth={true} className={newCard? classes.newCardButton : classes.button}>
        {children}
        </Button>

        {!newCard && (
            < CardActions>
              <div className={classes.cardActions}>
              <IconButton aria-label="Share">
                <RemoveIcon />
              </IconButton>
                  <IconButton aria-label="Add to favorites">
                      <DeleteIcon className={classes.deleteIcon} />
                  </IconButton>
              </div>
            </CardActions>
        )}

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

export default withStyles(styles)(CustomCard);
