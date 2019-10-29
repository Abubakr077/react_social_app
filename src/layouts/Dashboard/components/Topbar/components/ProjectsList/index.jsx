import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';

// Material icons
import {
  ArrowForwardIos as ArrowForwardIosIcon,
  Payment as PaymentIcon,
  PeopleOutlined as PeopleIcon,
  Code as CodeIcon,
  Store as StoreIcon
} from '@material-ui/icons';

// Component styles
import styles from './styles';
import Tooltip from "@material-ui/core/Tooltip";



class ProjectsList extends Component {

  render() {
    const { className, classes, onSelect } = this.props;
    const rootClassName = classNames(classes.root, className);
    const projects = JSON.parse(localStorage.getItem('projects'));

    return (
      <div className={rootClassName}>
        {projects  ? (
          <Fragment>
            <div className={classes.content}>
              <List component="div">
                {projects.map(membership => (
                  <Link
                    key={membership.project.id}
                    onClick={()=>{
                      window.location.reload()
                    }}
                    to={
                    {
                      pathname: `/dashboard/project`,
                      state: {
                      project_id: membership.project.id
                    }
                    }
                    }
                    // target="_blank"
                  >
                    <Tooltip title="Click to load" placement="left">
                    <ListItem
                      className={classes.listItem}
                      component="div"
                      onClick={()=>this.onSelectItem(membership)}
                    >
                      <ListItemText
                        classes={{ secondary: classes.listItemTextSecondary }}
                        primary={membership.project.name}
                      />
                      <ArrowForwardIosIcon className={classes.arrowForward} />
                    </ListItem>
                    </Tooltip>
                    <Divider />
                  </Link>
                ))}
              </List>
              <div className={classes.footer}>
                <Button
                  color="primary"
                  component={Link}
                  size="small"
                  to="/dashboard"
                  variant="contained"
                >
                  all projects
                </Button>
              </div>
            </div>
          </Fragment>
        ) : (
          <div className={classes.empty}>
            <div className={classes.emptyImageWrapper}>
              <img
                alt="Empty list"
                className={classes.emptyImage}
                src='/images/empty.png'
              />
            </div>
            <Typography variant="h4">There's nothing here...</Typography>
          </div>
        )}
      </div>
    );
  }

  onSelectItem(membership) {
    console.log('here');
    console.log(membership);
    localStorage.setItem('project_id',membership.project.id);
    localStorage.setItem('project',JSON.stringify(membership));
    return true;
  }
}

ProjectsList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  notifications: PropTypes.array.isRequired,
  onSelect: PropTypes.func
};

ProjectsList.defaultProps = {
  notifications: [],
  onSelect: (membership) => {

  }
};

export default withStyles(styles)(ProjectsList);
