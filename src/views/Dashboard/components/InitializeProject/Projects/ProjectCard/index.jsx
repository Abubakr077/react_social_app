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
              onClick={this.me}
              {...rest}
              className={rootClassName}
              newCard={true}
          >
            <div className={classes.newCard}>
              <AddIcon
                  color="primary"
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
              newCard={false}
          >
            <div className={classes.details}>
                <Typography
                    className={classes.title}
                    variant="h3"
                >
                  {project.name}
                </Typography>
                <Typography
                    variant="caption"
                >
                  {project.role}
                </Typography>
            </div>
          </Card>
      );
    }

  }

  me() {
    alert('here')
  }
}

ProjectCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectCard);
