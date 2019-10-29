import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// Externals
import PropTypes from 'prop-types';
import endpoints from 'constants/endpoints.json';
import { target, langs, targetType, target_subtype, scheduleMinuteOptions, scheduleOptions, numTweet } from 'constants/constants.js';
// Material helpers
import {
    withStyles,
    Button
} from '@material-ui/core';

import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';

import Typography from '@material-ui/core/Typography';
import TagInput from '../components/TagInput';
import SelectField from '../components/SelectField';
import DatePickerInline from '../components/DatePicker'
import GoogleMap from '../components/GoogleMap';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import validate from "validate.js";
import schema from "./schema";


// Component styles
import styles from './style';
import request from 'helpers/request.js';
import compose from 'recompose/compose';
import { toast } from 'react-toastify';
import { Message, optionsError } from "constants/constants";




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
        errorText: "",
        isValid: false,
        isScheduleUnit: true,
        post: {
            description: "",
            schedule: "",
            schedule_units: null,
            job_details: {
                username: "",
                all_words: "",
                exact_phrase: "",
                any_words: "",
                not_words: "",
                hashtag: "",
                lang: "",
                reply_to: "",
                mentioned_user: "",
                near_place: "",
                from_date: "",
                to_date: "",
                crawl_num_tweets: -1,
                target_id: "",
                platform: "TWITTER",
                target_type: "",
                target_subtype: ""
            }
        }
    };

    velidator = (val, unit) => {
        var error = "";
        console.log("velidation function call");
        console.log(unit);
        console.log(val);
        if (unit == "EVERY_N_MINUTES") {
            error = validate({ Unit: parseInt(val) }, schema.unitMin);
        }

        if (unit == "EVERY_N_HOURS") {
            error = validate({ Unit: parseInt(val) }, schema.unitHours);
        }

        if (unit == "EVERY_N_HOURS") {
            error = validate({ Unit: parseInt(val) }, schema.unitHours);
        }

        if (!error) {
            this.setState({
                isValid: false,
                errorText: "",
                post: { ...this.state.post, schedule_units: parseInt(val) },
            });
        } else {
            this.setState({
                isValid: true,
                errorText: error.Unit,
            });
        }
    };

    getUserName = (username) => {
        console.log(username.tags.join(" "));
        const data = this.state.post;
        const currentstate = data;
        currentstate.job_details.username = username.tags.join(" ")
        console.log(currentstate);
        this.setState({
            currentstate
        });
    }
    getAllWords = (words) => {
        console.log(words.tags);
        const data = this.state.post;
        const currentstate = data;
        currentstate.job_details.all_words = words.tags.join(" ")
        console.log(currentstate);
        this.setState({
            currentstate
        });
    }
    getAnyWords = (words) => {
        console.log(words.tags);
        const data = this.state.post;
        const currentstate = data;
        currentstate.job_details.any_words = words.tags.join(" ")
        console.log(currentstate);
        this.setState({
            currentstate
        });
    }
    getNotWords = (words) => {
        console.log(words.tags);
        const data = this.state.post;
        const currentstate = data;
        currentstate.job_details.not_words = words.tags.join(" ")
        console.log(currentstate);
        this.setState({
            currentstate
        });
    }
    getHashtags = (hashtags) => {
        console.log(hashtags.tags);
        const data = this.state.post;
        const currentstate = data;
        currentstate.job_details.hashtag = hashtags.tags.join(" ")
        console.log(currentstate);
        this.setState({
            currentstate
        });
    }
    getReplyTo = (user) => {
        console.log(user.tags);
        const data = this.state.post;
        const currentstate = data;
        currentstate.job_details.reply_to = user.tags.join(" ")
        console.log(currentstate);
        this.setState({
            currentstate
        });
    }
    getMentionedUsers = (user) => {
        console.log(user.tags);
        const data = this.state.post;
        const currentstate = data;
        currentstate.job_details.mentioned_user = user.tags.join(" ")
        console.log(currentstate);
        this.setState({
            currentstate
        });
    }
    inputExactPhrase = (e) => {
        const val = e.target.value;
        console.log(val)
        const data = this.state.post;
        const currentstate = data;
        currentstate.job_details.exact_phrase = val
        console.log(currentstate);
        this.setState({
            currentstate
        });
    }
    inputDescription = (e) => {
        const val = e.target.value;
        console.log(val)
        this.setState({
            post: { ...this.state.post, description: val },
        });
    }
    getLatLong = (value) => {
        const val = value;
        console.log(val)
        const data = this.state.post;
        const currentstate = data;
        currentstate.job_details.near_place = val
        console.log(currentstate);
        this.setState({
            currentstate
        });
    }
    inputSchedule = (e) => {
        const val = e;
        if (val == "ONCE_EVERY_HOUR") {
            console.log("this is hour");
            this.setState({
                isScheduleUnit: true,
                errorText: "",
                post: { ...this.state.post, schedule_units: 1, schedule: val },
            });
        } else {
            console.log("this is minute and hours");
            this.setState({
                isScheduleUnit: false,
                post: { ...this.state.post, schedule: val, schedule_units: val ===  "EVERY_N_MINUTES" ? 5 : 2 },
            },()=>this.velidator(this.state.post.schedule_units, val));
            
        }
        
    }
    inputScheduleUnit = (e) => {
        const val = e.target.value;
        const unit = this.state.post.schedule;
        this.setState({
            isScheduleUnit: false,
            post: { ...this.state.post, schedule: unit, schedule_units: val },
        },()=>this.velidator(this.state.post.schedule_units, unit));
    }
    inputUserName = (e) => {
        const val = e.target.value;
        console.log(val);
        const data = this.state;
        const currentstate = data;
        currentstate.post.job_details.username = val;
        currentstate.isUserNameError=false;
        currentstate.errorText = "";
        console.log(currentstate);
        this.setState({
            currentstate
        });
    }
    getFromDate = (date) => {
        console.log(date);
        const data = this.state.post;
        const currentstate = data;
        currentstate.job_details.from_date = date
        console.log(currentstate);
        this.setState({
            currentstate
        });
    }
    getToDate = (date) => {
        console.log(date);
        const data = this.state.post;
        const currentstate = data;
        currentstate.job_details.to_date = date
        console.log(currentstate);
        this.setState({
            currentstate
        });
    }
    getNumTweets = (value) => {
        console.log(value);
        const data = this.state.post;
        const currentstate = data;
        currentstate.job_details.crawl_num_tweets = parseInt(value)
        console.log(currentstate);
        this.setState({
            currentstate
        });
    }
    getTargetType = (value) => {
        console.log(value);
        if (value != "USER") {
            const data = this.state;
            const currentstate = data;
            currentstate.post.job_details.target_subtype = "POST";
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
            const data = this.state;
            const currentstate = data;
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

    }
    getTargetSubtype = (value) => {
        console.log(value);
        if (value != "INFO") {
            const data = this.state;
            const currentstate = data;
            currentstate.post.job_details.target_subtype = value;
            currentstate.isInfo = false;
            currentstate.visible = true;
            console.log(currentstate);
            this.setState({
                currentstate
            });
        } else {
            const data = this.state;
            const currentstate = data;
            currentstate.post.job_details.target_subtype = value;
            currentstate.isInfo = true;
            currentstate.visible = false;
            console.log(currentstate);
            this.setState({
                currentstate
            });
        }
    }
    getLang = (value) => {
        console.log(value);
        const data = this.state.post;
        const currentstate = data;
        currentstate.job_details.lang = value
        console.log(currentstate);
        this.setState({
            currentstate
        });
    }
    startJob = async (e) => {
        e.preventDefault();
        const { history } = this.props;
        console.log(this.state.post);
        console.log(JSON.stringify(this.state.post));
        const projectId = localStorage.getItem('project_id');
        const user = JSON.parse(localStorage.getItem('user'));
        if (this.state.post.job_details.username == "") {
            this.setState({
                isUserNameError: true,
                errorText: "Please Enter User Name",
            });
        }
        try {
            await request({
                url: endpoints.createMonitoringJob,
                method: 'POST',
                headers: {
                    user_id: user.id,
                    X_Auth_Token: user.x_auth_token.token,
                    project_id: projectId,
                    Content_Type: "application/json"
                },
                data: JSON.stringify(this.state.post)
            }).then((res) => {
                history.push("/dashboard/project");
            });
        } catch (error) {
            toast.error(<Message name={error.data} />, optionsError);
            console.log(error)
        }
    };
    render() {
        const { classes, className, ...rest } = this.props;
        return (
            <Grid container >
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
                                    variant="outlined"
                                />
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Grid item xs={12}>
                                <SelectField getValue={this.getTargetType} options={target} label={"Monitor"} disabled={false} />
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Grid item xs={12}>
                                <SelectField getValue={this.getTargetSubtype} options={targetType} label={"Target"} disabled={this.state.isTargerSubtype} />
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                {this.state.visible === true ?
                    <Grid container className={classes.space} spacing={3}>
                        {this.state.isUser === true ?
                            <Grid item xs={12}>
                                <Grid container spacing={3} >
                                    <Grid item xs={12}>
                                        <Paper className={classes.paper}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    onKeyUp={this.inputExactPhrase}
                                                    id="outlined-dense"
                                                    label="Exact Phrase"
                                                    className={clsx(classes.textField, classes.dense)}
                                                    margin="dense"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item xs={12}>
                                            <TagInput label={"User Name"} getData={this.getUserName} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            :
                            <Grid item xs={12}>
                                <Grid container spacing={3} >
                                    <Grid item xs={6}>
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
                                            </Grid>
                                            {this.state.isUserNameError ? <Typography className={classes.error}>{this.state.errorText}</Typography> : null}
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Paper className={classes.paper}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    onKeyUp={this.inputExactPhrase}
                                                    id="outlined-dense"
                                                    label="Exact Phrase"
                                                    className={clsx(classes.textField, classes.dense)}
                                                    margin="dense"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>}
                        <Grid item xs={this.state.isUser === true ? 6 : 4}>
                            <Grid item xs={12}>
                                <TagInput label={"HashTags"} getData={this.getHashtags} />
                            </Grid>
                        </Grid>
                        <Grid item xs={this.state.isUser === true ? 6 : 4}>
                            <Grid item xs={12}>
                                <TagInput label={"Reply To"} getData={this.getReplyTo} />
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid item xs={12}>
                                <TagInput label={"All Words"} getData={this.getAllWords} />
                            </Grid>
                        </Grid>
                        <Grid item xs={this.state.isUser === true ? 4 : 6}>
                            <Grid item xs={12}>
                                <TagInput label={"Any Words"} getData={this.getAnyWords} />
                            </Grid>
                        </Grid>
                        <Grid item xs={this.state.isUser === true ? 4 : 6}>
                            <Grid item xs={12}>
                                <TagInput label={"Not Words"} getData={this.getNotWords} />
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={3} >
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <Grid item xs={12}>
                                            <DatePickerInline getDate={this.getFromDate} label={"Start Date"} />
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <Grid item xs={12}>
                                            <DatePickerInline getDate={this.getToDate} label={"End Date"} />
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid item xs={12}>
                                        <TagInput label={"Mentioned Users"} getData={this.getMentionedUsers} />
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <Grid item xs={12}>
                                            <SelectField getValue={this.getNumTweets} options={numTweet} label={"Total Tweets"} />
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <Grid item xs={12}>
                                            <SelectField getValue={this.getLang} options={langs} label={"Language"} />
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <Grid item xs={12}>
                                            <SelectField getValue={this.inputSchedule} options={scheduleOptions} label={"Schedule"} disabled={false} />
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
                                                className={clsx(classes.textField, classes.dense)}
                                                margin="dense"
                                                variant="outlined"
                                                helperText=""
                                                disabled={this.state.isScheduleUnit}
                                                value={this.state.post.schedule_units}
                                            />
                                        </Grid>
                                        {this.state.isValid ? <Typography className={classes.error}>{this.state.errorText}</Typography> : null}
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        onClick={this.startJob}
                                        className={classes.signInButton}
                                        color="primary"
                                        size="large"
                                        variant="contained"
                                        margin="dense"
                                        disabled = {this.state.isValid}
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
                                        <Grid item xs={12}>
                                            <TextField
                                                id="outlined-dense"
                                                label="Search Location"
                                                className={clsx(classes.textField, classes.dense)}
                                                margin="dense"
                                                variant="outlined"
                                                value={this.state.post.job_details.near_place}
                                            />
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <Typography>  Select Location:</Typography>
                                        <Grid item xs={12}>
                                            <GoogleMap getLatLong={this.getLatLong} center={{ lat: 28.3753, lng: 73.3451 }} zoom={5} />
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    :
                    null}
                {this.state.isInfo === true ?
                    <Grid container spacing={3} >
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
                                </Grid>
                                {this.state.isUserNameError ? <Typography className={classes.error}>{this.state.errorText}</Typography> : null}
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                                <Grid item xs={12}>
                                    <SelectField getValue={this.inputSchedule} options={scheduleOptions} label={"Schedule"} disabled={false} />
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
                                        disabled={this.state.isScheduleUnit}
                                        value={this.state.post.schedule_units}
                                    />
                                </Grid>
                                {this.state.isValid ? <p className={classes.error}>{this.state.errorText}</p> : null}
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
                                >
                                    Register Job
                    </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                    :
                    null}
            </Grid>
        );
    }
}

Twitter.propTypes = {
    className: PropTypes.string,
};

export default compose(
    withRouter,
    withStyles(styles)
)(Twitter);

