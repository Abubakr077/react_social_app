import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
// Externals
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
// Material helpers
// Material components
import {Badge, IconButton, Popover, Toolbar, Typography, withStyles} from '@material-ui/core';
// Material icons
import {
  Close as CloseIcon,
  Input as InputIcon,
  Menu as MenuIcon,
  NotificationsOutlined as NotificationsIcon
} from '@material-ui/icons';
// Shared services
import {getNotifications} from 'services/notification';
// Custom components
import {NotificationList,ProjectsList} from './components';
// Component styles
import styles from './styles';
import {lookupProject} from 'services/project';

class Topbar extends Component {
  signal = true;
  project = null;

  state = {
    notifications: [],
    notificationsLimit: 4,
    notificationsCount: 5,
    notificationsEl: null,
    projectsEl: null,
  };

  async getNotifications() {
    try {
      const { notificationsLimit } = this.state;

      const { notifications, notificationsCount } = await getNotifications(
        notificationsLimit
      );

      if (this.signal) {
        this.setState({
          notifications,
          notificationsCount
        });
      }
    } catch (error) {
      return;
    }
  }

  componentDidMount() {
    this.signal = true;
    this.getNotifications();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  handleSignOut = () => {
    const { history } = this.props;

    localStorage.clear();
    localStorage.setItem('isAuthenticated', "false");

    history.entries = [];
    history.index = -1;
    history.push("/login");
  };

  handleShowNotifications = event => {
    this.setState({
      notificationsEl: event.currentTarget
    });
  };
  handleShowProjects = event => {
    this.setState({
      projectsEl: event.currentTarget
    });
  };

  handleCloseNotifications = () => {
    this.setState({
      notificationsEl: null
    });
  };
  handleCloseProjects = () => {
    this.setState({
      projectsEl: null
    });
  };

  getAcronyms = (title) => {
    let matches = title.match(/\b(\w)/g);
    return matches.join('');
  };

  render() {
    const {
      classes,
      className,
      title,
      isSidebarOpen,
      onToggleSidebar,
      initUser
    } = this.props;

    const {
      notifications,
      notificationsCount,
      notificationsEl,
      projectsEl
    } = this.state;

    const rootClassName = classNames(classes.root, className);
    const showNotifications = Boolean(notificationsEl);
    const showProjects = Boolean(projectsEl);

    if (!initUser){
      const project = JSON.parse(localStorage.getItem('project'));
      if (project){
        this.project = project.project;
      }
    }

    return (
      <Fragment>
        <div className={rootClassName}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              className={classes.menuButton}
              onClick={onToggleSidebar}
              variant="text"
            >
              {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Typography
              className={classes.title}
              variant="h4"
            >
              {title}
            </Typography>
            <IconButton
              className={classes.notificationsButton}
              onClick={this.handleShowNotifications}
            >
              <Badge
                badgeContent={notificationsCount}
                color="primary"
                variant="dot"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            {!initUser&& (
                <IconButton
                className={classes.signOutButton}
                onClick={this.handleShowProjects}
            >
              <Typography
                  variant="button"
                  color="primary"
              >
                {this.getAcronyms(this.project.name)}
              </Typography>
            </IconButton>
            )}
            <IconButton
              className={classes.signOutButton}
              onClick={this.handleSignOut}
            >
              <InputIcon />
            </IconButton>
          </Toolbar>
        </div>
        <Popover
          anchorEl={notificationsEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          onClose={this.handleCloseNotifications}
          open={showNotifications}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          {/*<NotificationList*/}
          {/*  notifications={notifications}*/}
          {/*  onSelect={this.handleCloseNotifications}*/}
          {/*/>*/}
        </Popover>
        <Popover
            anchorEl={projectsEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            onClose={this.handleCloseProjects}
            open={showProjects}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
        >
            <ProjectsList
            />
        </Popover>
      </Fragment>
    );
  }
}

Topbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isSidebarOpen: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
  title: PropTypes.string
};

Topbar.defaultProps = {
  onToggleSidebar: () => {}
};

export default compose(
  withRouter,
  withStyles(styles)
)(Topbar);
