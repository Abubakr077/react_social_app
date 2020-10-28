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
import moment from 'moment';
import { scheduleOptions, facebookTypes, numTweet } from 'constants/constants.js';
import PortletFooter from '../../../../../../components/PortletFooter';
import clsx from 'clsx';
import schema from './schema';
import request from 'helpers/request.js';
import { toast } from 'react-toastify';
import { Message, optionsError } from 'constants/constants';
import endpoints from 'constants/endpoints.json';
import Paper from '@material-ui/core/Paper';
import schemaUser from './schemaUser';
import VideosList from '../../Lists/VideosList';
import schemaTrend from './schemaTrend';

class Facebook extends Component {
  state = {
    isLoading: false,
    isValid: false,
    submitError: false,
    serviceError: null,
    showKeywords: false,
    values: {
      profile: '',
      channel: '',
      target_type: 'profile',
      keyword: '',
      description: '',
      unit: '',
      schedule: '',
      crawl_num_tweets: ''
    },
    post: {
      job_details: {
      crawl_num_tweets: -1,
      }
      },
    touched: {
      profile: false,
      channel: false,
      target_type: false,
      keyword: false,
      description: false,
      unit: false,
      crawl_num_tweets: false,
      schedule: false
    },
    errors: {
      profile: null,
      channel: null,
      target_type: null,
      keyword: null,
      description: null,
      unit: null,
      crawl_num_tweets: null,
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
    if (this.state.values.target_type === 'profile') {
      this.schema.profile = {
        presence: { allowEmpty: false, message: 'is required' },
        url: {
          url: true,
          message: 'is not valid'
        }
      };
    }
  }
  getNumTweets = (value) => {
    console.log(value);
    const currentstate = this.state.post;
    currentstate.job_details.crawl_num_tweets = parseInt(value);
    handleFieldChange(this, 'crawl_num_tweets', value, this.isTrendPosts ? schemaTrend : schemaUser);
    console.log(currentstate);
    this.setState({
      currentstate
    });
  };
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
            'platform': 'FACEBOOK',
            'target_type': values.target_type.toUpperCase(),
            'url': values.target_type === 'profile' ?
              values.profile :
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
    const showprofileError = touched.profile && errors.profile;
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
            subtitle="you can get results directly from profile link too"
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
                  label="Name"
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
              
            ) : values.target_type === 'profile' ? (
              <div className={classes.fieldDiv}>
                <TextField
                  className={classes.textField}
                  label={'Profile Link'}
                  margin="dense"
                  variant="outlined"
                  autoFocus
                  name={'Profile Link'}
                  onChange={event => {
                    handleFieldChange(this, 'profile', event.target.value, this.schema);
                  }
                  }
                  type="text"
                  value={values.profile}
                />
                {showprofileError && (
                  <Typography
                    className={classes.fieldError}
                    variant="body2"
                  >
                    {errors.profile[0]}
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
                    this.schema.profile = {};
                    this.schema.channel = {};
                  } else if (value === 'profile') {
                    this.setState({
                      showKeywords: false
                    })
                    this.schema.profile = {
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
                    this.schema.profile = {};
                  }
                  handleFieldChange(this, 'target_type', value, this.schema);

                }
                }
                options={facebookTypes} label={'Type'}
              />
            </div>  
          </Grid>
           {/* Post limit */}
          {
            !isKeyword && <Grid className={classes.descriptionBodyp}>
              <SelectField  getValue={this.getNumTweets}
                value={this.state.post.job_details.crawl_num_tweets}
                options={numTweet} label={'Total Posts'}
              />
            </Grid> 
          }
          <br />
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

Facebook.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(Facebook);

