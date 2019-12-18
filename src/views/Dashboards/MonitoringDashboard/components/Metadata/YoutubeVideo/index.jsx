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
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
class YoutubeVideo extends Component {
  render() {
    const { classes, className,data, ...rest } = this.props;
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
              <Typography variant="h1">{data.title}</Typography>

              <div className={classes.viewsBody}>
                <div >
                  <Typography variant="h4">Channel Name</Typography>
                  <Typography
                      className={classes.username}
                      variant="body1">{data.channel_name}</Typography>
                </div>
              <div className={classes.followers}>
                <div >
                  <Typography variant="h4">Category</Typography>
                  <Typography
                      className={classes.username}
                      variant="body1">{data.category}</Typography>
                </div>
              </div>
              <div className={classes.followers}>
                <div >
                  <Typography variant="h4">Views</Typography>
                  <Typography
                      className={classes.username}
                      variant="body1">{data.views}</Typography>
                </div>
              </div>
              </div>
              <div className={classes.details}>
                <TodayOutlinedIcon className={classes.icon}/>
              <Typography
                className={classes.locationText}
                variant="body1"
              >{data.publication_date}
              </Typography>
              </div>
              <div className={classes.details}>
                <PermIdentityOutlinedIcon className={classes.icon}/>
                <Typography
                    className={classes.locationText}
                    variant="body1"
                >{data.name}
                </Typography>
              </div>
            </div>
            <Avatar
              className={classes.avatar}
              src={data.thumbnail}
            />
          </div>
          <div className={classes.details}>
            <DescriptionOutlinedIcon className={classes.icon}/>
            <Typography
                className={classes.locationText}
                variant="body1"
            >
              {data.tags.map(tag=>
                  tag+ ', '
              )}
            </Typography>
          </div>
        </PortletContent>
      </Portlet>
    );
  }
}

YoutubeVideo.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(YoutubeVideo);
