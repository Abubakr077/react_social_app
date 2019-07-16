import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';

// Material helpers
import {CardActions, Fab, TableCell, withStyles} from '@material-ui/core';

// Material components
import { Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

// Shared components
import { Paper,Card } from 'components';

// Component styles
import styles from './styles';


class InviteCard extends Component {
  signal = false;

  state = {
    invite: this.props.invite,
  };

  render() {
    const { classes, className, ...rest } = this.props;
    const { invite } = this.state;

    const rootClassName = classNames(classes.root, className);

      return (
          <Card
              {...rest}
              className={rootClassName}
              newCard={false}
          >
            <div className={classes.details}>
              <Typography
                  className={classes.title}
                  variant="h3"
              >
                {invite.name}
              </Typography>
              <Typography
                  variant="caption"
              >
                {invite.role}
              </Typography>
            </div>
          </Card>
      );

  }

}

InviteCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InviteCard);
