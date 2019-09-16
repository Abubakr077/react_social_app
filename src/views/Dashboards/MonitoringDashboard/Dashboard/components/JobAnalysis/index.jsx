import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import {
  CircularProgress, Dialog, DialogContent, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography,
  withStyles
} from '@material-ui/core';

import {
  Dashboard as DashboardLayout

} from 'layouts';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from 'components';

// Component styles
import styles from './styles';

// Shared Resources
import compose from "recompose/compose";
import PNTweetsLine from "../Grapths/PNTweetsLine";
import PNTweetsPie from "../Grapths/PNTweetsPie";
import {WordClouds} from "../index";

class JobAnalysis extends Component {

  state = {
    isLoading: false
  };

  render() {
    const { classes, className, ...rest } = this.props;
    const rootClassName = classNames(classes.root, className);
    const job = JSON.parse(localStorage.getItem('job'));
    console.log(job);
    const {
      isLoading
    } = this.state;
      const title = "Analysis of "+ job.description ;

    return (
        <DashboardLayout className={rootClassName}
                         title={title}
                         initUser = {false}>
          <div className={classes.root}>
            <Portlet >
              <PortletHeader noDivider>
                <PortletLabel
                    title="Twitter Tweets"
                />
              </PortletHeader>
                <PortletContent
                    className={classes.contentBody}
                    noPadding
                >
                  <PNTweetsLine/>
                  <PNTweetsPie/>
                </PortletContent>
            </Portlet>
            <br/>
            <br/>
            <Grid
                item
                xs={12}
            >
              <WordClouds/>
            </Grid>
          </div>
        </DashboardLayout>
    );
  }
}


JobAnalysis.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default
compose(
    withStyles(styles)
)
(JobAnalysis);

