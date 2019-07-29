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

import * as color from '../../../../common/colors';

// Component styles
const styles = theme => {
  return {
    root: {
      borderRadius: '8px',
      minHeight: 198,
      minWidth: 276,
      paddingTop: theme.spacing.unit *2,
      paddingLeft: theme.spacing.unit *2

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
      marginTop: theme.spacing(4)
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
  const { classes, className, outlined, squared, children, ...rest } = props;

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
        {children}
            < CardActions >
              <div className={classes.cardActions}>
              <IconButton aria-label="Share">
                <CancelIcon className={classes.cancelButton}/>
              </IconButton>
                <IconButton aria-label="Add to favorites">
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

export default withStyles(styles)(CustomCard);
