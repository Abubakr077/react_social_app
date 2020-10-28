import React, { Component } from 'react';
// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';
// Material helpers
// Material components
import { Avatar, Typography, withStyles } from '@material-ui/core';
// Shared components
import { Portlet, PortletContent } from 'components';
// Component styles
import styles from './styles';
import PersonPinCircleOutlinedIcon from '@material-ui/icons/PersonPinCircleOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';

class FacebookProfile extends Component {
  render() {
    const { classes, className, data, ...rest } = this.props;
    const rootClassName = classNames(classes.root, className);

    console.log(data);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletContent>
          <div className={classes.details}>
            <div className={classes.info}>
              <Typography variant="h2">{data.user_name}</Typography>
              <div className={classes.details}>
                <PersonPinCircleOutlinedIcon className={classes.icon}/>
                <Typography
                  className={classes.locationText}
                  variant="body1"
                >{data.user_location}
                </Typography>
              </div>
              <div className={classes.details}>
                <PermIdentityOutlinedIcon className={classes.icon}/>
                <Typography
                  className={classes.locationText}
                  variant="body1"
                >{data.user_screen_name}
                </Typography>
              </div>
            </div>

            <div className={classes.followers}>
              <div>
                <Typography variant="h2">Posts</Typography>
                <Typography
                  className={classes.username}
                  variant="body1">{data.user_count_tweets}</Typography>
              </div>
            </div>
            <div className={classes.followers}>
              <div>
                <Typography variant="h2">Friends</Typography>
                <Typography
                  className={classes.username}
                  variant="body1">{data.user_count_followers}</Typography>
              </div>
            </div>
            <div className={classes.followers}>
              <div>
                <Typography variant="h2">Following</Typography>
                <Typography
                  className={classes.username}
                  variant="body1">{data.user_count_following}</Typography>
              </div>
            </div>
            <Avatar
              className={classes.avatar}
              src={data.user_image}
            />
          </div>
          <div className={classes.details}>
            <DescriptionOutlinedIcon className={classes.icon}/>
            <Typography
              className={classes.locationText}
              variant="body1"
            >
              {data.user_desc}
            </Typography>
          </div>
        </PortletContent>
      </Portlet>
    );
  }
}

FacebookProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FacebookProfile);
