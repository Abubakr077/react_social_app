import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import {Collapse, withStyles} from '@material-ui/core';

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
    HowToVoteOutlined as InvitesIcon, ExpandLess, ExpandMore,
    VisibilityOutlined as MonitorIcon,
  PlaylistAddOutlined as CreateIcon,
  ViewListOutlined as ViewJobs
} from '@material-ui/icons';

// Component styles
import styles from './styles';
import theme from "../../../../theme";


class Sidebar extends Component {
    state = {
        open: true
    };
    
    render() {
        const {classes, className, initUser,options} = this.props;
        const rootClassName = classNames(classes.root, className);
        return (
            <nav className={rootClassName}>
                <div className={classes.logoWrapper}>
                    <Link
                        className={classes.logoLink}
                        to="/"
                    >
                        {/*<img*/}
                        {/*    alt="Logo"*/}
                        {/*    className={classes.logoImage}*/}
                        {/*    src='/images/logos/logoNCCS.png'*/}
                        {/*/>*/}
                        <Typography
                            color={"primary"}
                            variant="h1" component="h2"
                            style={{display: 'flex',alignSelf: 'flex-end' }}
                        >
                            <div>
                                <span  style={{marginRight: theme.spacing.unit}}>A</span>
                                <span  style={{marginRight: theme.spacing.unit}}>I</span>
                                <span   style={{marginRight: theme.spacing.unit}}>R</span>
                                <span   style={{marginRight: theme.spacing.unit}}>W</span>
                                <span   style={{marginRight: theme.spacing.unit}}>A</span>
                                <span   style={{marginRight: theme.spacing.unit}}>T</span>
                                <span   style={{marginRight: theme.spacing.unit}}>C</span>
                                <span className="city">H</span>
                            </div>
                        </Typography>
                    </Link>
                </div>
                <Divider className={classes.logoDivider}/>
                {initUser && (<List
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
                            <CreateProjectIcon/>
                        </ListItemIcon>
                        <ListItemText
                            classes={{primary: classes.listItemText}}
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
                            <InvitesIcon/>
                        </ListItemIcon>
                        <ListItemText
                            classes={{primary: classes.listItemText}}
                            primary="invites"
                        />
                    </ListItem>
                </List>)}
                {!initUser && (<List
                    component="div"
                    disablePadding
                >
                    <ListItem
                        activeClassName={classes.activeListItem}
                        className={classes.listItem}
                        component={NavLink}
                        to={"/dashboard/project"}
                    >
                        <ListItemIcon className={classes.listItemIcon}>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText
                            classes={{primary: classes.listItemText}}
                            primary="Home"
                        />
                    </ListItem>

                    <ListItem
                        activeClassName={classes.activeListItem}
                        className={classes.listItem}
                        // component={NavLink}
                        onClick={() => {
                            this.setState(prev => ({
                                open: !prev.open
                            }))
                        }}>
                        <ListItemIcon className={classes.listItemIcon}>
                            <MonitorIcon/>
                        </ListItemIcon>
                        <ListItemText
                            classes={{primary: classes.listItemText}}
                            primary="Monitoring"/>
                        {this.state.open ?
                            <ExpandLess className={classes.listItemIcon}/> :
                            <ExpandMore className={classes.listItemIcon}/>}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List disablePadding>
                            <ListItem activeClassName={classes.activeListItemNested}
                                      className={classes.listItemNested}
                                      component={NavLink}
                                      to="/createJob"
                            >
                                <ListItemIcon className={classes.listItemIcon}>
                                    <CreateIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    classes={{primary: classes.listItemText}}
                                    primary="Create"/>
                            </ListItem>
                          <ListItem activeClassName={classes.activeListItemNested}
                                    className={classes.listItemNested}
                                    component={NavLink}
                                    to={"/dashboard/project"}
                          >
                            <ListItemIcon className={classes.listItemIcon}>
                              <ViewJobs/>
                            </ListItemIcon>
                            <ListItemText
                                classes={{primary: classes.listItemText}}
                                primary="View Jobs"/>
                          </ListItem>
                            {/*{options.isTweetsRoute && (*/}
                            {/*    <ListItem activeClassName={classes.activeListItemNested}*/}
                            {/*                                     className={classes.listItemNested}*/}
                            {/*                                     component={NavLink}*/}
                            {/*                                     to={"/dashboard/"+project_id+'/tweets'}*/}
                            {/*>*/}
                            {/*    <ListItemIcon className={classes.listItemIcon}>*/}
                            {/*        <ViewJobs/>*/}
                            {/*    </ListItemIcon>*/}
                            {/*    <ListItemText*/}
                            {/*        classes={{primary: classes.listItemText}}*/}
                            {/*        primary="View Tweets"/>*/}
                            {/*</ListItem>)}*/}
                        </List>
                    </Collapse>


                    {/*<ListItem*/}
                    {/*    activeClassName={classes.activeListItem}*/}
                    {/*    className={classes.listItem}*/}
                    {/*    component={NavLink}*/}
                    {/*    to="/visualizations"*/}
                    {/*>*/}
                    {/*    <ListItemIcon className={classes.listItemIcon}>*/}
                    {/*        <VisualsIcon/>*/}
                    {/*    </ListItemIcon>*/}
                    {/*    <ListItemText*/}
                    {/*        classes={{primary: classes.listItemText}}*/}
                    {/*        primary="Visualizations"*/}
                    {/*    />*/}
                    {/*</ListItem>*/}
                    {/*<ListItem*/}
                    {/*    activeClassName={classes.activeListItem}*/}
                    {/*    className={classes.listItem}*/}
                    {/*    component={NavLink}*/}
                    {/*    to="/trends"*/}
                    {/*>*/}
                    {/*    <ListItemIcon className={classes.listItemIcon}>*/}
                    {/*        <TrendingIcon/>*/}
                    {/*    </ListItemIcon>*/}
                    {/*    <ListItemText*/}
                    {/*        classes={{primary: classes.listItemText}}*/}
                    {/*        primary="Trends"*/}
                    {/*    />*/}
                    {/*</ListItem>*/}
                  <ListItem
                      activeClassName={classes.activeListItem}
                      className={classes.listItem}
                      component={NavLink}
                      to="/users"
                  >
                    <ListItemIcon className={classes.listItemIcon}>
                      <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText
                        classes={{primary: classes.listItemText}}
                        primary="Activity Log"
                    />
                  </ListItem>
                    <ListItem
                        activeClassName={classes.activeListItem}
                        className={classes.listItem}
                        component={NavLink}
                        to="/send_invites"
                    >
                        <ListItemIcon className={classes.listItemIcon}>
                            <InvitesIcon/>
                        </ListItemIcon>
                        <ListItemText
                            classes={{primary: classes.listItemText}}
                            primary="Project Invites"
                        />
                    </ListItem>
                    <ListItem
                        activeClassName={classes.activeListItem}
                        className={classes.listItem}
                        component={NavLink}
                        to="/account"
                    >
                        <ListItemIcon className={classes.listItemIcon}>
                            <SettingsIcon/>
                        </ListItemIcon>
                        <ListItemText
                            classes={{primary: classes.listItemText}}
                            primary="Account Settings"
                        />
                    </ListItem>
                </List>)}

                <Divider className={classes.listDivider}/>
            </nav>
        );
    }
}

Sidebar.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
