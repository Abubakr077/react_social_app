import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Typography,
  Button } from '@material-ui/core';

// Shared components
import { Paper } from 'components';

// Component styles
import styles from './styles';

class InviteCard extends Component {
  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Paper
        {...rest}
        className={rootClassName}
      >
        <div className={classes.content}>
          <div className={classes.details}>
            <Typography
              className={classes.title}
              variant="body2"
            >
              Admin
            </Typography>
            <Typography
              className={classes.value}
              variant="h3"
            >
              Project Name
            </Typography>
          </div>
        </div>
        <div className={classes.footer}>
          <Typography
            className={classes.difference}
            variant="caption"
          >
            12/12/2012
          </Typography>
          <Button
              className={classes.uploadButton}
              color="primary"
              variant="text"
          >
            Upload picture
          </Button>
          <Button variant="text">Remove picture</Button>
        </div>
      </Paper>
    );
  }
}

InviteCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InviteCard);
