import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
// Material helpers
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  withStyles
} from '@material-ui/core';
// Component styles
import styles from './styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import AddIcon from '@material-ui/icons/Add';
import { CustomCard as Card } from 'components';
import schema from './schema';
import { toast } from 'react-toastify';
import * as endPoints from 'constants/endpoints.json';
import * as endpoints from 'constants/endpoints.json';
import * as constants from 'constants/constants.js';
import request from 'helpers/request.js';
import { handleFieldChange } from 'services/form';
import { Message, optionsError } from '../../../../constants/constants';

class Projects extends Component {

  signal = false;
  state = {
    isLoading: false,
    projects: [],
    isValid: false,
    open: false,
    name: null,
    values: {
      name: ''
    },
    touched: {
      name: false
    },
    errors: {
      name: null
    }
  };

  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseSave = this.handleCloseSave.bind(this);
  }

  async getProjects() {
    try {

      this.setState({ isLoading: true });
      const user = JSON.parse(localStorage.getItem('user'));
      await request({
        url: endpoints.getMemberships,
        method: 'GET',
        headers: {
          user_id: user.id,
          x_auth_token: user.x_auth_token.token
        }
      }).then((res) => {
        localStorage.setItem('projects', JSON.stringify(res.memberships));
        if (this.signal) {
          this.setState({
            isLoading: false,
            projects: res.memberships
          });
        }
        this.props.addProjects(res.memberships);
      });
    } catch (error) {
      toast.error(<Message name={error.data}/>, optionsError);
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  };

  componentWillUnmount() {
    this.signal = false;
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props !== nextProps) {
      this.setState({
        projects: nextProps.projects
      }, () => {
        localStorage.setItem('projects', JSON.stringify(nextProps.projects));
      });
    }
  }

  componentDidMount() {
    this.signal = true;
    this.getProjects();
  }

  handleOpen() {
    this.setState(() => ({
      open: true
    }));
  }


  handleClose() {
    this.setState(() => ({
      open: false
    }));
  }

  handleCloseSave = async (e) => {
    this.setState({ isLoading: true });

    const { history } = this.props;
    const { values } = this.state;
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      await request({
        url: endPoints.createProject,
        method: 'POST',
        data: {
          name: values.name
        },
        headers: {
          user_id: user.id,
          x_auth_token: user.x_auth_token.token
        }
      }).then((res) => {
        localStorage.setItem('projects', JSON.stringify(this.props.projects));
        this.setState({
          isLoading: false,
          open: false
        });
        this.props.addProject(res);
      });
    } catch (e) {
      toast.error(<Message name={e.data}/>, optionsError);
      this.setState({
        isLoading: false,
        open: false
      });
    }
  };

  render() {
    const { classes, className, ...rest } = this.props;
    const rootClassName = classNames(classes.root, className);
    const {
      isLoading,
      values,
      touched,
      errors,
      isValid
    } = this.state;
    const showProjects = !isLoading && this.state.projects;
    const showNameError = touched.name && errors.name;
    return (
      <div className={rootClassName}>
        <div>
          <div
            className={classes.portletContent}
          >
            {isLoading && (
              <div className={classes.progressWrapper}>
                <CircularProgress/>
              </div>
            )}
            {!isLoading && (
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
                  <Card
                    onClick={this.handleOpen}
                    {...rest}
                    newCard={true}
                  >
                    <div className={classes.newCard}>
                      <AddIcon
                        color="primary"
                        className={classes.extendedIcon}/>
                      <Typography
                        variant="button"
                        color="primary"
                      >
                        Add project
                      </Typography>
                    </div>
                  </Card>
                </Grid>

                {showProjects && (
                  this.state.projects.map(project => (
                    <Grid
                      item
                      lg={3}
                      sm={4}
                      xl={3}
                      xs={6}
                    >

                      <Card
                        {...rest}
                        newCard={false}
                        cardProject={project}
                      >
                        <div className={classes.details}>
                          <Typography
                            className={classes.title}
                            variant="h3"
                          >
                            {project.project.name}
                          </Typography>
                          <Typography
                            variant="caption"
                          >
                            {project.role}
                          </Typography>
                        </div>
                      </Card>
                    </Grid>
                  ))
                )}
              </Grid>
            )}
            <Dialog open={this.state.open}
                    onClose={this.handleClose}
                    className={classes.dialogueBody}
                    fullWidth={true}
            >
              <DialogTitle
                id="form-dialog-title">Create New Project</DialogTitle>

              <form action="/" method="POST" onSubmit={(e) => {
                e.preventDefault();
                this.handleCloseSave();
              }}>
                {isLoading && (
                  <div className={classes.progressWrapper}>
                    <CircularProgress/>
                  </div>
                )}
                {!isLoading && (
                  <DialogContent>
                    <TextField
                      className={classes.textField}
                      label="Project Name"
                      name="name"
                      id="name"
                      onChange={event =>
                        handleFieldChange(this, 'name', event.target.value, schema)
                      }
                      type="text"
                      value={values.title}
                      variant="outlined"
                    />
                    {showNameError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.name[0]}
                      </Typography>
                    )}
                  </DialogContent>
                )}
                <div>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      disabled={!isValid}
                    >
                      Create
                    </Button>
                  </DialogActions>
                </div>
              </form>
            </Dialog>
          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    projects: state.projects
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addProjects: projects => dispatch({ type: constants.ADD_PROJECTS, projects }),
    addProject: project => dispatch({ type: constants.ADD_PROJECT, project })
  };
};

Projects.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withStyles(styles)
)(Projects);
