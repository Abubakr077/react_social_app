import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// Externals
import PropTypes from 'prop-types';
import endpoints from 'constants/endpoints.json';
import { langs, numTweet, scheduleOptions, target, targetType } from 'constants/constants.js';
// Material helpers
import { Button, withStyles } from '@material-ui/core';

import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';

import Typography from '@material-ui/core/Typography';
import TagInput from '../components/TagInput';
import SelectField from '../components/SelectField';
import DatePickerInline from '../components/DatePicker';
import GoogleMap from '../components/GoogleMap';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// Component styles
import styles from './style';
import request from 'helpers/request.js';
import compose from 'recompose/compose';
import { toast } from 'react-toastify';
import { Message, optionsError } from 'constants/constants';
import moment from 'moment';
import schemaUser from './schemaUser';
import { handleFieldChange } from 'services/form';
import schemaTrend from './schemaTrend';

class Twitter extends Component {
  constructor(props) {
    super(props);
    this.inputScheduleUnit = this.inputScheduleUnit.bind(this);
    this.inputUserName = this.inputUserName.bind(this);
  }

  state = {
    visible: false,
    isUserNameError: false,
    isUser: false,
    isTargerSubtype: true,
    isInfo: false,
    errorText: '',
    isValid: false,
    isScheduleUnit: true,
    post: {
      description: '',
      schedule: '',
      schedule_units: null,
      job_details: {
        username: '',
        all_words: '',
        exact_phrase: '',
        any_words: '',
        not_words: '',
        hashtag: '',
        lang: 'en',
        reply_to: '',
        mentioned_user: '',
        near_place: '',
        from_date: moment(new Date()).format('YYYY-MM-DD'),
        to_date: moment(new Date()).format('YYYY-MM-DD'),
        crawl_num_tweets: -1,
        target_id: '',
        platform: 'TWITTER',
        target_type: '',
        target_subtype: ''
      }
    },
    values: {
      description: '',
      crawl_num_tweets: '',
      username: '',
      hashtag: '',
      unit: ''
    },
    touched: {
      description: false,
      crawl_num_tweets: false,
      username: false,
      hashtag: true,
      unit: false
    },
    errors: {
      description: null,
      crawl_num_tweets: null,
      username: null,
      hashtag: null,
      unit: null
    }

  };
  getUserName = (username) => {
    console.log(username.tags.join(' '));
    const currentstate = this.state.post;
    currentstate.job_details.username = username.tags.join(' ');
    console.log(currentstate);
    this.setState({
      currentstate
    });
  };
  getAllWords = (words) => {
    console.log(words.tags);
    const currentstate = this.state.post;
    currentstate.job_details.all_words = words.tags.join(' ');
    console.log(currentstate);
    this.setState({
      currentstate
    });
  };
  getAnyWords = (words) => {
    console.log(words.tags);
    const currentstate = this.state.post;
    currentstate.job_details.any_words = words.tags.join(' ');
    console.log(currentstate);
    this.setState({
      currentstate
    });
  };
  getNotWords = (words) => {
    console.log(words.tags);
    const currentstate = this.state.post;
    currentstate.job_details.not_words = words.tags.join(' ');
    console.log(currentstate);
    this.setState({
      currentstate
    });
  };
  getHashtags = (hashtags) => {
    console.log(hashtags.tags);
    const currentstate = this.state.post;
    currentstate.job_details.hashtag = hashtags.tags.join(' ');
    handleFieldChange(this, 'hashtag', currentstate.job_details.hashtag, this.isTrendPosts ? schemaTrend : schemaUser);
    console.log(currentstate);
    this.setState({
      currentstate
    });
  };
  getReplyTo = (user) => {
    console.log(user.tags);
    const currentstate = this.state.post;
    currentstate.job_details.reply_to = user.tags.join(' ');
    console.log(currentstate);
    this.setState({
      currentstate
    });
  };
  getMentionedUsers = (user) => {
    console.log(user.tags);
    const currentstate = this.state.post;
    currentstate.job_details.mentioned_user = user.tags.join(' ');
    console.log(currentstate);
    this.setState({
      currentstate
    });
  };
  inputExactPhrase = (e) => {
    const val = e.target.value;
    console.log(val);
    const currentstate = this.state.post;
    currentstate.job_details.exact_phrase = val;
    console.log(currentstate);
    this.setState({
      currentstate
    });
  };
  inputDescription = (e) => {
    const val = e.target.value;
    handleFieldChange(this, 'description', e.target.value, this.isTrendPosts ? schemaTrend : schemaUser);
    this.setState({
      post: { ...this.state.post, description: val }
    });
  };
  getLatLong = (value) => {
    const val = value;
    console.log(val);
    const currentstate = this.state.post;
    currentstate.job_details.near_place = val;
    console.log(currentstate);
    this.setState({
      currentstate
    });
  };
  inputSchedule = (val) => {
    this.showUnitError = false;
    const schema = this.isTrendPosts ? schemaTrend : schemaUser;
    schema.Schedule = {
      presence: { allowEmpty: false, message: 'is required' }
    };
    if (val === 'EVERY_N_MINUTES') {
      schema.unit = {
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
      schema.unit = {
        presence: { allowEmpty: false, message: 'is required' },
        numericality: {
          onlyInteger: true,
          greaterThan: 1,
          lessThanOrEqualTo: 24,
          message: 'Only Integer between 2 to 23'
        }
      };
    } else {
      schema.unit = {
        presence: { allowEmpty: false, message: 'is required' },
        numericality: {
          onlyInteger: true,
          equalTo: 1
        }
      };
    }
    handleFieldChange(this, 'Schedule', val, schema);

    if (val === 'ONCE_EVERY_HOUR') {
      this.setState({
        isScheduleUnit: true,
        post: { ...this.state.post, schedule_units: 1, schedule: val }
      }, () => handleFieldChange(this, 'unit', this.state.post.schedule_units, schema));
    } else {
      this.setState({
        isScheduleUnit: false,
        post: {
          ...this.state.post, schedule: val,
          schedule_units: val === 'EVERY_N_MINUTES' ? 5 : 2
        }
      }, () => handleFieldChange(this, 'unit', this.state.post.schedule_units, schema));
    }
  };
  inputScheduleUnit = (e) => {
    const val = e.target.value;
    const unit = this.state.post.schedule;
    const schema = this.isTrendPosts ? schemaTrend : schemaUser;
    handleFieldChange(this, 'unit', val, schema);

    this.setState({
      isScheduleUnit: false,
      post: { ...this.state.post, schedule: unit, schedule_units: val }
    });
  };
  inputUserName = (e) => {
    const val = e.target.value;
    console.log(val);
    const currentstate = this.state;
    currentstate.post.job_details.username = val;
    currentstate.isUserNameError = false;
    currentstate.errorText = '';
    handleFieldChange(this, 'username', val, this.isTrendPosts ? schemaTrend : schemaUser);
    console.log(currentstate);
    this.setState({
      currentstate
    });
  };
  getFromDate = (date) => {
    console.log(date);
    const currentstate = this.state.post;
    currentstate.job_details.from_date = date;
    console.log(currentstate);
    this.setState({
      currentstate
    });
  };
  getToDate = (date) => {
    console.log(date);
    const currentstate = this.state.post;
    currentstate.job_details.to_date = date;
    console.log(currentstate);
    this.setState({
      currentstate
    });
  };
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
  getTargetType = (value) => {
    if (value !== 'USER') {
      const currentstate = this.state;
      currentstate.post.job_details.target_subtype = 'POST';
      currentstate.post.job_details.target_type = value;
      currentstate.isUser = true;
      currentstate.isTargerSubtype = true;
      currentstate.isInfo = false;
      currentstate.visible = true;
      console.log(currentstate);
      this.setState({
        currentstate
      });
    } else {
      const currentstate = this.state;
      currentstate.post.job_details.target_subtype = null;
      currentstate.post.job_details.target_type = value;
      currentstate.isUser = false;
      currentstate.isTargerSubtype = false;
      currentstate.isInfo = false;
      currentstate.visible = false;
      console.log(currentstate);
      this.setState({
        currentstate
      });
    }
    if (value === 'TREND') {
      handleFieldChange(this, 'target', value, schemaTrend);
    } else {
      handleFieldChange(this, 'target', value, schemaUser);
    }
  };
  getTargetSubtype = (value) => {
    console.log(value);
    const currentstate = this.state;
    currentstate.post.job_details.target_subtype = value;
    if (value !== 'INFO') {
      currentstate.isInfo = false;
      currentstate.visible = true;
      console.log(currentstate);
      this.setState({
        currentstate
      });
    } else {
      currentstate.isInfo = true;
      currentstate.visible = false;
      console.log(currentstate);
      this.setState({
        currentstate
      });
    }
    handleFieldChange(this, 'target_subType', value, schemaUser);
  };
  getLang = (value) => {
    console.log(value);
    const currentstate = this.state.post;
    currentstate.job_details.lang = value;
    console.log(currentstate);
    this.setState({
      currentstate
    });
  };
  startJob = async (e) => {
    e.preventDefault();
    const { history } = this.props;
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
        data: JSON.stringify(this.state.post)
      }).then((res) => {
        history.push('/dashboard/project');
      });
    } catch (error) {
      toast.error(<Message name={error.data}/>, optionsError);
      console.log(error);
    }
  };

  render() {
    const { classes, className, ...rest } = this.props;
    this.isTrendPosts = (this.state.post.job_details.target_subtype === 'POST' && this.state.post.job_details.target_type === 'TREND');

    const {
      isLoading,
      touched,
      errors,
      isValid,
      values
    } = this.state;
    const showDescriptionError = touched.description && errors.description;
    const showUserNameError = touched.username && errors.username;
    const showHashTagError = touched.hashtag && errors.hashtag;
    this.showUnitError = touched.unit && errors.unit;
    return (
      <Grid container>
        <Grid container className={classes.space} spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Grid item xs={12}>
                <TextField
                  onKeyUp={this.inputDescription}
                  id="outlined-dense"
                  label="Job Description"
                  className={clsx(classes.textField, classes.dense)}
                  margin="dense"
                  autoFocus
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
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Grid item xs={12}>
                <SelectField getValue={this.getTargetType}
                             value={this.state.post.job_details.target_type}
                             options={target} label={'Monitor'}
                             disabled={false}
                />
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Grid item xs={12}>
                <SelectField getValue={this.getTargetSubtype}
                             value={this.state.post.job_details.target_subtype}
                             options={targetType}
                             label={'Target'} disabled={this.state.isTargerSubtype}
                />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        {this.state.visible === true ?
          <Grid container className={classes.space} spacing={3}>
            {(!this.state.isUser) && (
              <Grid item xs={12} className={classes.flexGrid}>
                <Paper className={classes.paper2}>
                  <Grid item xs={12}>
                    <TextField
                      onKeyUp={this.inputUserName}
                      id="outlined-dense"
                      label="User Name"
                      className={clsx(classes.textField, classes.dense)}
                      margin="dense"
                      variant="outlined"
                      name="username"
                    />
                    {showUserNameError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.username[0]}
                      </Typography>
                    )}
                  </Grid>
                </Paper>
                {/*<Grid item xs={6} className={classes.half}>*/}
                {/*    <TagInput  label={"Any Words"} getData={this.getAnyWords} />*/}
                {/*</Grid>*/}
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <TextField
                      id="outlined-dense"
                      label="Click Map for Location"
                      className={clsx(classes.textField, classes.dense)}
                      margin="dense"
                      variant="outlined"
                      value={this.state.post.job_details.near_place}
                    />
                  </Paper>
                </Grid>
              </Grid>)
            }
            {this.isTrendPosts && (
              <Grid item xs={12} className={classes.flexGrid}>
                <Grid item xs={6} className={classes.spaceRight}>
                  <Paper>
                    <TagInput label={'HashTags'} getData={this.getHashtags}/>
                    {showHashTagError && (
                      <Typography
                        className={[classes.fieldErrorHash]}
                        variant="body2"
                      >
                        {errors.hashtag[0]}
                      </Typography>
                    )}
                  </Paper>
                </Grid>
                {/*<Grid item xs={6}>*/}
                {/*    <TagInput label={"Any Words"} getData={this.getAnyWords} />*/}
                {/*</Grid>*/}
                <Grid item xs={6}>
                  <Paper className={[classes.paper, classes.locationField]}>
                    <TextField
                      id="outlined-dense"
                      label="Click Map for Location"
                      className={clsx(classes.textField, classes.dense)}
                      margin="dense"
                      variant="outlined"
                      value={this.state.post.job_details.near_place}
                    />
                  </Paper>
                </Grid>

              </Grid>)}
            {/*<Grid item xs={this.state.isUser === true ? 6 : 4}>*/}
            {/*    {((!this.isTrendPosts) || isUserPosts) && (<Grid item xs={12}>*/}
            {/*        <TagInput label={"Reply To"} getData={this.getReplyTo} />*/}
            {/*    </Grid>)*/}

            {/*    }*/}
            {/*</Grid>*/}
            {/*{((!this.isTrendPosts) || isUserPosts) && (<Grid item xs={4}>*/}
            {/*    <Grid item xs={12}>*/}
            {/*        <TagInput label={"All Words"} getData={this.getAllWords} />*/}
            {/*    </Grid>*/}
            {/*</Grid>)}*/}
            {/*<Grid item xs={this.state.isUser === true ? 4 : 6}>*/}
            {/*    {((!this.isTrendPosts) || isUserPosts) && ( <Grid item xs={12}>*/}
            {/*        <TagInput label={"Not Words"} getData={this.getNotWords} />*/}
            {/*    </Grid>)}*/}
            {/*</Grid>*/}
            <Grid item xs={6}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <Grid item xs={12}>
                      <DatePickerInline getDate={this.getFromDate} label={'Start Date'}/>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <Grid item xs={12}>
                      <DatePickerInline getDate={this.getToDate} label={'End Date'}/>
                    </Grid>
                  </Paper>
                </Grid>
                {/*{((!this.isTrendPosts) || isUserPosts) && (*/}
                {/*    <Grid item xs={12}>*/}
                {/*    <Grid item xs={12}>*/}
                {/*        <TagInput label={"Mentioned Users"} getData={this.getMentionedUsers} />*/}
                {/*    </Grid>*/}
                {/*</Grid>)}*/}
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <Grid item xs={12}>
                      <SelectField getValue={this.inputSchedule}
                                   options={scheduleOptions} label={'Schedule'}
                                   value={this.state.post.schedule}
                                   disabled={false}
                      />
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <Grid item xs={12}>
                      <TextField
                        onChange={this.inputScheduleUnit}
                        id="outlined-dense"
                        label="Schedule Units"
                        name="unit"
                        className={clsx(classes.textField, classes.dense)}
                        margin="dense"
                        variant="outlined"
                        helperText=""
                        disabled={this.state.isScheduleUnit}
                        value={this.state.post.schedule_units || ''}
                      />
                    </Grid>
                    {this.showUnitError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.unit[0]}
                      </Typography>
                    )}
                  </Paper>
                </Grid>

                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <Grid item xs={12}>
                      <SelectField getValue={this.getNumTweets}
                                   value={this.state.post.job_details.crawl_num_tweets}
                                   options={numTweet} label={'Total Tweets'}
                      />
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <Grid item xs={12}>
                      <SelectField getValue={this.getLang}
                                   value={this.state.post.job_details.lang}
                                   options={langs}
                                   label={'Language'}
                      />
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12} className={classes.CreateJobButtonBody}>
                  <Button
                    onClick={this.startJob}
                    className={classes.signInButton}
                    color="primary"
                    size="large"
                    variant="contained"
                    margin="dense"
                    disabled={!isValid}
                  >
                    Register Job
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Typography variant="h6" className={classes.mapTitle}> SELECT LOCATION:</Typography>
                    <Grid item xs={12}>
                      <GoogleMap
                        getLatLong={this.getLatLong} center={{ lat: 28.3753, lng: 73.3451 }} zoom={5}
                      />
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          :
          null}
        {this.state.isInfo &&
        <Grid container spacing={3} className={classes.space}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Grid item xs={12}>
                <TextField
                  onKeyUp={this.inputUserName}
                  id="outlined-dense"
                  label="User Name"
                  className={clsx(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                />
                {showUserNameError && (
                  <Typography
                    className={classes.fieldError}
                    variant="body2"
                  >
                    {errors.username[0]}
                  </Typography>
                )}
              </Grid>
              {this.state.isUserNameError ?
                <Typography className={classes.error}>{this.state.errorText}</Typography> : null}
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Grid item xs={12}>
                <SelectField getValue={this.inputSchedule} options={scheduleOptions} label={'Schedule'}
                             value={this.state.post.schedule}

                             disabled={false}
                />
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Grid item xs={12}>
                <TextField
                  onChange={this.inputScheduleUnit}
                  id="outlined-dense"
                  label="Schedule Units"
                  className={clsx(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                  name="unit"
                  disabled={this.state.isScheduleUnit}
                  value={this.state.post.schedule_units || ''}
                />
              </Grid>
              {this.showUnitError && (
                <Typography
                  className={classes.fieldError}
                  variant="body2"
                >
                  {errors.unit[0]}
                </Typography>
              )}
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Button
                onClick={this.startJob}
                className={classes.signInButton}
                color="primary"
                size="large"
                variant="contained"
                margin="dense"
                disabled={!isValid}
              >
                Register Job
              </Button>
            </Paper>
          </Grid>
        </Grid>}
      </Grid>
    );
  }
}

Twitter.propTypes = {
  className: PropTypes.string
};

export default compose(
  withRouter,
  withStyles(styles)
)(Twitter);

