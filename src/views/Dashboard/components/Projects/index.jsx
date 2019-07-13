import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Material helpers
import {CircularProgress, Grid, Table, TableBody, TableCell, TableHead, TableRow, withStyles} from '@material-ui/core';

// Material components
import { Typography,Paper } from '@material-ui/core';

// Shared services
import { getProjects } from 'services/project';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
} from 'components';


// Component styles
import styles from './styles';
import ProjectCard from "./ProjectCard";

class Projects extends Component {
  signal = false;

  state = {
    isLoading: false,
    projects: [],
  };


  async getProjects(limit) {
    try {
      this.setState({ isLoading: true });

      const { projects } = await getProjects(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
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

    this.getProjects(limit);
  }

  componentWillUnmount() {
    this.signal = false;
  }

  render() {
    const { classes, className, ...rest } = this.props;
    const rootClassName = classNames(classes.root, className);
    const { isLoading, projects } = this.state;
    const showProjects = !isLoading && projects.length > 0;

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
              {showProjects && (
                  <Grid
                      container
                      spacing={4}
                  >
                    <Grid
                        item
                        lg={3}
                        sm={4}
                        xl={3}
                        xs={6}
                    >
                      <ProjectCard className={classes.newCard} isNewCard={true}/>
                    </Grid>

                    {
                      projects.map(project => (
                        <Grid
                            item
                            lg={3}
                            sm={4}
                            xl={3}
                            xs={6}
                        >
                        <ProjectCard project={project} isNewCard={false}/>
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

Projects.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Projects);
