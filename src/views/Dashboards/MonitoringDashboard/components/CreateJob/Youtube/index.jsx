import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
// Material helpers
import { Button, CircularProgress, Grid, TextField, withStyles } from '@material-ui/core';
// Component styles
import styles from './styles';
import Typography from '@material-ui/core/Typography';
// Shared components
import { PortletContent, PortletLabel } from 'components';
import { handleFieldChange } from 'services/form';
import compose from 'recompose/compose';
import SelectField from '../components/SelectField';

import { scheduleOptions, youtubeTypes } from 'constants/constants.js';
import PortletFooter from '../../../../../../components/PortletFooter';
import clsx from 'clsx';
import schema from './schema';
import request from 'helpers/request.js';
import { toast } from 'react-toastify';
import { Message, optionsError } from 'constants/constants';
import endpoints from 'constants/endpoints.json';
import VideosList from '../../Lists/VideosList';


class Youtube extends Component {
  state = {
    isLoading: false,
    isValid: false,
    submitError: false,
    serviceError: null,
    showKeywords: false,
    values: {
      video: '',
      channel: '',
      target_type: 'video',
      keyword: '',
      description: '',
      unit: '',
      schedule: ''
    },
    touched: {
      video: false,
      channel: false,
      target_type: false,
      keyword: false,
      description: false,
      unit: false,
      schedule: false
    },
    errors: {
      video: null,
      channel: null,
      target_type: null,
      keyword: null,
      description: null,
      unit: null,
      schedule: null
    }
  };
  inputSchedule = (val) => {
    if (val === 'EVERY_N_MINUTES') {
      this.schema.unit = {
        presence: { allowEmpty: false, message: 'is required' },
        numericality: {
          // onlyInteger: true,
          greaterThan: 4,
          lessThanOrEqualTo: 59,
          divisibleBy: 5,
          message: 'only multiples of 5 upto 55'
        }
      };
    } else if (val === 'EVERY_N_HOURS') {
      this.schema.unit = {
        presence: { allowEmpty: false, message: 'is required' },
        numericality: {
          onlyInteger: true,
          greaterThan: 1,
          lessThanOrEqualTo: 24,
          message: 'Only Integer between 2 to 23'
        }
      };
    } else {
      this.schema.unit = {
        presence: { allowEmpty: false, message: 'is required' },
        numericality: {
          onlyInteger: true,
          equalTo: 1
        }
      };
    }
    handleFieldChange(this, 'schedule', val, this.schema);

    if (val === 'ONCE_EVERY_HOUR') {
      this.setState({
        isScheduleUnit: true
      }, () => handleFieldChange(this, 'unit', 1, this.schema));
    } else {
      this.setState({
        isScheduleUnit: false
      }, () => handleFieldChange(this, 'unit', val === 'EVERY_N_MINUTES' ? 5 : 2, this.schema));
    }
  };

  componentDidMount() {
    this.schema = schema;
    if (this.state.values.target_type === 'video') {
      this.schema.video = {
        presence: { allowEmpty: false, message: 'is required' },
        url: {
          url: true,
          message: 'is not valid'
        }
      };
    }
  }

  createJob = async () => {
    const { history } = this.props;
    const { values } = this.state;
    this.setState({
      isLoading: true
    });
    const projectId = localStorage.getItem('project_id');
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      await request({
        url: endpoints.createMonitoringJob,
        method: 'POST',
        headers: {
          user_id: user.id,
          X_Auth_Token: user.x_auth_token.token,
          project_id: projectId,
          Content_Type: 'application/json'
        },
        data: {
          'description': values.description,
          'schedule': values.schedule,
          'schedule_units': values.unit,
          'job_details': {
            'platform': 'YOUTUBE',
            'target_type': values.target_type.toUpperCase(),
            'url': values.target_type === 'video' ?
              values.video :
              values.target_type === 'channel' ?
                values.channel :
                values.keyword,
            'target_id': ''
          }
        }
      }).then((res) => {
        this.setState({
          isLoading: false
        });
        history.push('/dashboard/project');
      });
    } catch (error) {
      this.setState({
        isLoading: false
      });
      toast.error(<Message name={error.data}/>, optionsError);
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
      isValid,
      showKeywords
    } = this.state;
    const showVideoError = touched.video && errors.video;
    const showChannelError = touched.channel && errors.channel;
    const showKeywordError = touched.keyword && errors.keyword;
    const showDescriptionError = touched.description && errors.description;
    const showUnitError = touched.unit && errors.unit;
    this.prevState = this.props.location.state;

    let isKeyword = values.target_type === 'keyword';

    return (
      <div className={rootClassName}>

        <div className={classes.keyWordsHeader}>
          <PortletLabel
            title="Search By Keywords"
            subtitle="you can get results directly from video link and channel link too"
          />
        </div>
        <PortletContent
          noPadding
        >
          <Grid item className={classes.keyWordsBody}>
            {values.target_type === 'keyword' ? (
              <div className={classes.fieldDiv}>
                <TextField
                  className={classes.textField}
                  label="Keyword"
                  margin="dense"
                  variant="outlined"
                  name="Keyword"
                  autoFocus
                  onChange={event =>
                    handleFieldChange(this, 'keyword', event.target.value, this.schema)
                  }
                  type="text"
                  value={values.keyword}
                >
                </TextField>
                {showKeywordError && (
                  <Typography
                    className={classes.fieldError}
                    variant="body2"
                  >
                    {errors.keyword[0]}
                  </Typography>
                )}
              </div>
            ) : values.target_type === 'video' ? (
              <div className={classes.fieldDiv}>
                <TextField
                  className={classes.textField}
                  label={'Video Link'}
                  margin="dense"
                  variant="outlined"
                  autoFocus
                  name={'Video Link'}
                  onChange={event => {
                    handleFieldChange(this, 'video', event.target.value, this.schema);
                  }
                  }
                  type="text"
                  value={values.video}
                />
                {showVideoError && (
                  <Typography
                    className={classes.fieldError}
                    variant="body2"
                  >
                    {errors.video[0]}
                  </Typography>
                )}
              </div>
            ) : values.target_type === 'channel' && (
              <div className={classes.fieldDiv}>
                <TextField
                  className={classes.textField}
                  label={'Channel Link'}
                  margin="dense"
                  variant="outlined"
                  name={'Channel Link'}
                  autoFocus
                  onChange={event => {
                    handleFieldChange(this, 'channel', event.target.value, this.schema);
                  }
                  }
                  type="text"
                  value={values.channel}
                />
                {showChannelError && (
                  <Typography
                    className={classes.fieldError}
                    variant="body2"
                  >
                    {errors.channel[0]}
                  </Typography>
                )}
              </div>
            )
            }
            {
              !isKeyword && <div className={classes.descriptionBody}>
                <TextField
                  onChange={event =>
                    handleFieldChange(this, 'description', event.target.value, this.schema)
                  }
                  id="outlined-dense"
                  label="Job Description"
                  className={clsx(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                  name="description"
                />
                {showDescriptionError && (
                  <Typography
                    className={classes.fieldError}
                    variant="body2"
                  >
                    {errors.description[0]}
                  </Typography>
                )}
              </div>
            }


            <div className={classes.selectTypeYoutube}>
              <SelectField
                value={values.target_type}
                getValue={(value) => {
                  if (value === 'keyword') {
                    this.schema.keyword = {
                      presence: { allowEmpty: false, message: 'is required' }
                    };
                    this.schema.video = {};
                    this.schema.channel = {};
                  } else if (value === 'video') {
                    this.setState({
                      showKeywords: false
                    })
                    this.schema.video = {
                      presence: { allowEmpty: false, message: 'is required' },
                      url: {
                        url: true,
                        message: 'is not valid'
                      }
                    };
                    this.schema.keyword = {};
                    this.schema.channel = {};
                  } else {
                    this.setState({
                      showKeywords: false
                    })
                    this.schema.channel = {
                      presence: { allowEmpty: false, message: 'is required' },
                      url: {
                        url: true,
                        message: 'is not valid'
                      }
                    };
                    this.schema.keyword = {};
                    this.schema.video = {};
                  }
                  handleFieldChange(this, 'target_type', value, this.schema);

                }
                }
                options={youtubeTypes} label={'Type'}
              />
            </div>
          </Grid>
          {
            !isKeyword && <Grid item className={classes.keyWordsBody}>
              <Grid item xs={6} className={classes.schedule}>
                <SelectField getValue={this.inputSchedule}
                             options={scheduleOptions} label={'Schedule'}
                             value={values.schedule}
                />
              </Grid>
              <Grid item xs={6} className={classes.schedule}>
                <TextField
                  onChange={event =>
                    handleFieldChange(this, 'unit', event.target.value, this.schema)
                  }
                  id="outlined-dense"
                  label="Schedule Units"
                  name="unit"
                  className={clsx(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                  disabled={this.state.isScheduleUnit}
                  value={values.unit}
                />
                {showUnitError && (
                  <Typography
                    className={classes.fieldError}
                    variant="body2"
                  >
                    {errors.unit[0]}
                  </Typography>
                )}
              </Grid>
            </Grid>
          }
          { showKeywords &&
            <Grid  item xs={10}  className={classes.keyWordsBody}>
              <VideosList/>
            </Grid>
          }
        </PortletContent>
        <PortletFooter>
          <div className={classes.registerJob}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => this.createJob()}
              disabled={!isValid}
            >
              Register Job
            </Button>
            {
              isKeyword &&         <Button
                className={classes.searchButton}
                color="secondary"
                variant="contained"
                onClick={()=>
                  this.setState({
                    showKeywords: true
                  })
                }
              >
                Search
              </Button>
            }

            {isLoading && (<CircularProgress size={30} className={classes.loading}/>)}
          </div>
        </PortletFooter>
      </div>
    );
  }
}

Youtube.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(Youtube);

