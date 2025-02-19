import React, { Component } from 'react';
// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';
// Material helpers
// Material components
import { Divider, Typography, withStyles } from '@material-ui/core';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4,
    marginTop: 'auto'
  },
  company: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 0.5
  }
});

class Footer extends Component {
  render() {
    const { classes, className } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <Divider/>
        <Typography
          className={classes.company}
          variant="body1"
        >
          Social Media Forensics &copy; NCCS. 2019
        </Typography>
        <Typography variant="caption">
          Monitor profiles, channels, pages, blogs, trends and hashtag simultaneously.Perform visual analytics and
          generate reports.
          Support for Twitter, Facebook, Youtube.
        </Typography>
      </div>
    );
  }
}

Footer.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
