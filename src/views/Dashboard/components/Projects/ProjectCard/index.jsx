import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';

// Material helpers
import {Fab, TableCell, withStyles} from '@material-ui/core';

// Material components
import { Typography } from '@material-ui/core';

// Shared components
import { Paper,Card } from 'components';

// Component styles
import styles from './styles';
import AddIcon from '@material-ui/icons/Add';


class ProjectCard extends Component {
  signal = false;

  state = {
    project: this.props.project,
    isNewCard: false
  };
  render() {
    const { classes, className, isNewCard, ...rest } = this.props;
    const { project } = this.state;

    const rootClassName = classNames(classes.root, className);

    if (isNewCard){
      return (
          <Card
              {...rest}
              className={rootClassName}
          >
            <div className={classes.newCard}>
              <AddIcon
                  color="primary"
                  fontSize="large"
                  className={classes.extendedIcon} />
                <Typography
                    variant="button"
                    color="primary"
                >
                  Add project
                </Typography>
            </div>
          </Card>
      );
    }
    else {
      return (
          <Card
              {...rest}
              className={rootClassName}
          >
            <div className={classes.content}>
              <div className={classes.details}>
                <Typography
                    className={classes.title}
                    variant="body2"
                >
                  {project.role}
                </Typography>
                <Typography
                    className={classes.value}
                    variant="h3"
                >
                  {project.name}
                </Typography>
              </div>
            </div>
            <div className={classes.footer}>
              <Typography
                  className={classes.difference}
                  variant="caption"
              >
                {moment(project.createdAt).format('DD/MM/YYYY')}
              </Typography>
            </div>
          </Card>
      );
    }

  }
}

ProjectCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectCard);
