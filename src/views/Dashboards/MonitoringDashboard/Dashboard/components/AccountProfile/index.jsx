import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Avatar, Typography, Button, LinearProgress } from '@material-ui/core';

// Shared components
import { Portlet, PortletContent, PortletFooter } from 'components';

// Component styles
import styles from './styles';
import PersonPinCircleOutlinedIcon from '@material-ui/icons/PersonPinCircleOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
class AccountProfile extends Component {
  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletContent>
          <div className={classes.details}>
            <div className={classes.info}>
              <Typography variant="h2">Mohsin Dawar</Typography>
              <div className={classes.details}>
                <PersonPinCircleOutlinedIcon className={classes.icon}/>
              <Typography
                className={classes.locationText}
                variant="body1"
              >North Waziristan/Peshawar
              </Typography>
              </div>
              <div className={classes.details}>
                <PermIdentityOutlinedIcon className={classes.icon}/>
                <Typography
                    className={classes.locationText}
                    variant="body1"
                >mjdawar
                </Typography>
              </div>
            </div>

            <div className={classes.followers}>
              <div >
              <Typography variant="h2">Tweets</Typography>
                <Typography
                  className={classes.username}
                  variant="body1">28032</Typography>
              </div>
            </div>
            <div className={classes.followers}>
              <div >
                <Typography variant="h2">Followers</Typography>
                <Typography
                    className={classes.username}
                    variant="body1">155885</Typography>
              </div>
            </div>
            <div className={classes.followers}>
              <div >
                <Typography variant="h2">Following</Typography>
                <Typography
                    className={classes.username}
                    variant="body1">545</Typography>
              </div>
            </div>
            <Avatar
              className={classes.avatar}
              src="https://pbs.twimg.com/profile_images/736651661926621184/xmpX-0B6_400x400.jpg"
            />
          </div>
          <div className={classes.details}>
            <DescriptionOutlinedIcon className={classes.icon}/>
            <Typography
                className={classes.locationText}
                variant="body1"
            >
              Member National Assembly NA-48-North Waziristan. Pushtoon-Tahafuz-Movement, Writer, Lawyer_Peshawar-High Court.
            </Typography>
          </div>
        </PortletContent>
      </Portlet>
    );
  }
}

AccountProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountProfile);
