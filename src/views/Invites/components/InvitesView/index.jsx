import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Material helpers
import {
  CardActions,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles
} from '@material-ui/core';

// Material components
import { Typography } from '@material-ui/core';



// Shared services
import { getInvites,getProjects } from 'services/project';

// Shared components
import {   Card } from '../../components';

// Component styles
import styles from './styles';
import NoRecords from "../../../NoRecords"
import {statusColors} from 'constants/constants.js';
import {Status} from 'components';


class InvitesView extends Component {
  signal = false;

  state = {
    isLoading: false,
    invites: [],
    projects: []
  };


  async getInvites(limit) {
    try {
      this.setState({ isLoading: true });

      const { invites,projects } = await getInvites();

      if (this.signal) {
        this.setState({
          isLoading: false,
          invites,
          projects
        });
      }
    } catch (error) {
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  }

  componentDidMount() {
    this.signal = true;

    const { limit } = this.state;

    this.getInvites(limit);
  }

  componentWillUnmount() {
    this.signal = false;
  }

  render() {
    const { classes, className, ...rest } = this.props;
    const rootClassName = classNames(classes.root, className);
    const { isLoading, invites, projects } = this.state;
    const showInvites = !isLoading && projects.length > 0;
    // if (!showProjects){
    //   this.props.view();
    // }

    return (
        <div className={rootClassName}>
          <div>
            <div
                className={classes.portletContent}
            >
              {isLoading && (
                  <div className={classes.progressWrapper}>
                    <CircularProgress />
                  </div>
              )}
              {showInvites && (
                  <Grid
                      container
                      spacing={4}
                  >
                    {
                      projects.map(invite => (
                          <Grid
                              item
                              lg={3}
                              sm={4}
                              xl={3}
                              xs={6}
                          >
                            <Card
                                {...rest}
                            >
                              <div className={classes.details}>
                                <Typography
                                    className={classes.title}
                                    variant="h3"
                                >
                                  {invite.project.name}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    className={classes.caption}
                                >
                                  {invite.role}
                                </Typography>
                                <Typography
                                >
                                  <div className={classes.statusWrapper}>
                                    <Status
                                        className={classes.status}
                                        color={statusColors[invite.status]}
                                        size="sm"
                                    />
                                    {invite.status}
                                  </div>
                                </Typography>
                              </div>
                            </Card>
                          </Grid>
                      ))
                    }
                  </Grid>
              )}
            </div>
          </div>
        </div>

    );
  }
}

InvitesView.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InvitesView);
