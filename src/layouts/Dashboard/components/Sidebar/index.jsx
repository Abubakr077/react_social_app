import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography
} from '@material-ui/core';

// Material icons
import {
  DashboardOutlined as DashboardIcon,
  PeopleOutlined as PeopleIcon,
  SettingsOutlined as SettingsIcon,
  TrendingUpOutlined as TrendingIcon,
  PhotoSizeSelectActualOutlined as VisualsIcon,
  CreateNewFolderOutlined as CreateProjectIcon,
  HowToVoteOutlined as InvitesIcon,
} from '@material-ui/icons';

// Component styles
import styles from './styles';

class Sidebar extends Component {
  render() {
    const { classes, className , initUser} = this.props;

    const rootClassName = classNames(classes.root, className);

    if (initUser){
      return (
          <nav className={rootClassName}>
            <div className={classes.logoWrapper}>
              <Link
                  className={classes.logoLink}
                  to="/"
              >
                <img
                    alt="Brainalytica logo"
                    className={classes.logoImage}
                    src="/images/logos/brainalytica_logo.svg"
                />
              </Link>
            </div>
            <Divider className={classes.logoDivider} />
            <List
                component="div"
                disablePadding
            >
              <ListItem
                  activeClassName={classes.activeListItem}
                  className={classes.listItem}
                  component={NavLink}
                  to="/dashboard"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <CreateProjectIcon />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Projects"
                />
              </ListItem>
              <ListItem
                  activeClassName={classes.activeListItem}
                  className={classes.listItem}
                  component={NavLink}
                  to="/invites"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <InvitesIcon />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="invites"
                />
              </ListItem>
            </List>
            <Divider className={classes.listDivider} />
          </nav>
      );
    } else {
      return (
          <nav className={rootClassName}>
            <div className={classes.logoWrapper}>
              <Link
                  className={classes.logoLink}
                  to="/"
              >
                <img
                    alt="Brainalytica logo"
                    className={classes.logoImage}
                    src="/images/logos/brainalytica_logo.svg"
                />
              </Link>
            </div>
            <Divider className={classes.logoDivider} />
            <List
                component="div"
                disablePadding
            >
              <ListItem
                  activeClassName={classes.activeListItem}
                  className={classes.listItem}
                  component={NavLink}
                  to="/dashboard"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Home"
                />
              </ListItem>
              <ListItem
                  activeClassName={classes.activeListItem}
                  className={classes.listItem}
                  component={NavLink}
                  to="/visualizations"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <VisualsIcon />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Visualizations"
                />
              </ListItem>
              <ListItem
                  activeClassName={classes.activeListItem}
                  className={classes.listItem}
                  component={NavLink}
                  to="/trends"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <TrendingIcon />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Trends"
                />
              </ListItem>
              <ListItem
                  activeClassName={classes.activeListItem}
                  className={classes.listItem}
                  component={NavLink}
                  to="/users"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Users"
                />
              </ListItem>
              <ListItem
                  activeClassName={classes.activeListItem}
                  className={classes.listItem}
                  component={NavLink}
                  to="/account"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Account Settings"
                />
              </ListItem>
            </List>
            <Divider className={classes.listDivider} />

          </nav>
      );
    }


  }
}

Sidebar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
