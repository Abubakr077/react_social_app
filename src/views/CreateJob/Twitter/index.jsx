import React, { Component } from 'react';
// Externals
import PropTypes from 'prop-types';
import endpoints from 'constants/endpoints.json';

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
import { makeStyles } from '@material-ui/core/styles';
import { white } from 'common/colors';

// Component styles
import styles from './style';
import request from 'helpers/request.js';



class Twitter extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        visible: false,
        isUser: false,
        isInfo: false,
        post: {
            description: "",
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
                crawl_num_tweets: 0,
                target_id: "",
                platform: "TWITTER",
                target_type: "",
                target_subtype: ""
            }
        }
    };

    getUserName = (username) => {
        console.log(username.tags.join(" "));
        this.setState({
            post: {
                job_details: { ...this.state.post.job_details, username: username.tags.join(" ") }
            }
        })
    }
    getAllWords = (words) => {
        console.log(words.tags);
        this.setState({
            post: {
                job_details: { ...this.state.post.job_details, all_words: words.tags.join(" ") }
            }
        })
    }
    getAnyWords = (words) => {
        console.log(words.tags);
        this.setState({
            post: {
                job_details: { ...this.state.post.job_details, any_words: words.tags.join(" ") }
            }
        })
    }
    getNotWords = (words) => {
        console.log(words.tags);
        this.setState({
            post: {
                job_details: { ...this.state.post.job_details, not_words: words.tags.join(" ") }
            }
        })
    }
    getHashtags = (hashtags) => {
        console.log(hashtags.tags);
        this.setState({
            post: {
                job_details: { ...this.state.post.job_details, hashtag: hashtags.tags.join(" ") }
            }
        })
    }
    getReplyTo = (user) => {
        console.log(user.tags);
        this.setState({
            post: {
                job_details: { ...this.state.post.job_details, reply_to: user.tags.join(" ") }
            }
        })
    }
    getMentionedUsers = (user) => {
        console.log(user.tags);
        this.setState({
            post: {
                job_details: { ...this.state.post.job_details, mentioned_user: user.tags.join(" ") }
            }
        })
    }
    inputExactPhrase = (e) => {
        const val = e.target.value;
        console.log(val)
        this.setState({
            post: {
                job_details: { ...this.state.post.job_details, exact_phrase: val }
            }
        });
    }
    inputDescription = (e) => {
        const val = e.target.value;
        console.log(val)
        this.setState({
            post: { ...this.state.post, description: val },
        });
    }
    inputUserName = (e) => {
        const val = e.target.value;
        console.log(val)
        this.setState({
            post: {
                job_details: { ...this.state.post.job_details, username: val }
            }
        });
    }
    getFromDate = (date) => {
        console.log(date);
        this.setState({
            post: {
                job_details: { ...this.state.post.job_details, from_date: date }
            }
        })
    }
    getToDate = (date) => {
        console.log(date);
        this.setState({
            post: {
                job_details: { ...this.state.post.job_details, to_date: date }
            }
        })
    }
    getNumTweets = (value) => {
        console.log(value);
        this.setState({
            post: {
                job_details: { ...this.state.post.job_details, crawl_num_tweets: parseInt(value) }
            }
        })
    }
    getTargetType = (value) => {
        console.log(value);
        this.setState({
            post: {
                job_details: { ...this.state.post.job_details, target_type: value }
            }
        });
        if (value != "USER") {
            this.setState({
                isUser: true,
                isInfo:false,
                visible: true,
                post: {
                    job_details: { ...this.state.post.job_details, target_subtype: "POSTS" }
                }
            })
        } else {
            this.setState({
                isUser: false,
                isInfo:false,
                visible: false,
                post: {
                    job_details: { ...this.state.post.job_details, target_subtype: null }
                }
            })
        }

    }
    getTargetSubtype = (value) => {
        console.log(value);
        this.setState({
            post: {
                job_details: { ...this.state.post.job_details, target_subtype: value }
            }
        })
        if (value != "INFO") {
            this.setState({
                isInfo: false,
                visible: true
            })
        } else {
            this.setState({
                isInfo: true,
                visible: false
            })
        }
    }
    getLang = (value) => {
        console.log(value);
        this.setState({
            post: {
                job_details: { ...this.state.post.job_details, lang: value }
            }
        })
    }
    startJob = async (e) => {
        e.preventDefault();
        const { history } = this.props;
        console.log(this.state.post);
        console.log(JSON.stringify(this.state.post));
        const projectId = localStorage.getItem('project_id');
        const user = JSON.parse(localStorage.getItem('user'));
        try {
            await request({
                url: endpoints.createMonitoringJob,
                method: 'POST',
                headers: {
                    user_id: user.id,
                    x_auth_token: user.x_auth_token.token,
                    project_id: projectId
                },
                data: JSON.stringify(this.state)
            }).then((res) => {
                history.push("/dashboard/" + projectId);
            });
        } catch (error) {
            this.setState({

            });
            console.log("something wrong")
        }
    };
    render() {
        const langs = [
            { code: "any", name: "Any language" }, { code: "ar", name: "Arabic" }, { code: "bn", name: "Bangla" }, { code: "eu", name: "Basque" }, { code: "bg", name: "Bulgarian" }, { code: "ca", name: "Catalan" }, { code: "hr", name: "Croatian" }, { code: "cs", name: "Czech" }, { code: "da", name: "Danish" }, { code: "nl", name: "Dutch" }, { code: "en", name: "English" }, { code: "fi", name: "Finnish" }, { code: "fr", name: "French" }, { code: "de", name: "German" }, { code: "el", name: "Greek" }, { code: "gu", name: "Gujarati" }, { code: "he", name: "Hebrew" }, { code: "hi", name: "Hindi" }, { code: "hu", name: "Hungarian" }, { code: "id", name: "Indonesian" }, { code: "it", name: "Italian" }, { code: "ja", name: "Japanese" }, { code: "kn", name: "Kannada" }, { code: "ko", name: "Korean" }, { code: "mr", name: "Marathi" }, { code: "no", name: "Norwegian" }, { code: "fa", name: "Persian" }, { code: "pl", name: "Polish" }, { code: "pt", name: "Portuguese" }, { code: "ro", name: "Romanian" }, { code: "ru", name: "Russian" }, { code: "sr", name: "Serbian" }, { code: "zh-cn", name: "Simplified Chinese" }, { code: "sk", name: "Slovak" }, { code: "es", name: "Spanish" }, { code: "sv", name: "Swedish" }, { code: "ta", name: "Tamil" }, { code: "th", name: "Thai" }, { code: "zh-tw", name: "Traditional Chinese" }, { code: "tr", name: "Turkish" }, { code: "uk", name: "Ukrainian" }, { code: "ur", name: "Urdu" }, { code: "vi", name: "Vietnamese" }];
        const target = [
            {
                name: "User",
                code: "USER"
            },
            {
                name: "Keyword",
                code: "KEYWORD"
            },
            {
                name: "Trend",
                code: "TREND"
            }
        ];
        const target_type = [
            {
                name: "Profile Info",
                code: "INFO"
            },
            {
                name: "Posts",
                code: "POSTS"
            }
        ];
        const dict = [
            {
                name: "All",
                code: "All"
            },
            {
                name: "1000",
                code: "1000"
            },
            {
                name: "2000",
                code: "2000"
            },
            {
                name: "5000",
                code: "5000"
            },
            {
                name: "10000",
                code: "10000"
            }
        ];
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
                                <SelectField getValue={this.getTargetType} options={target} label={"What do you want to search ?"} disabled={false} />
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Grid item xs={12}>
                                <SelectField getValue={this.getTargetSubtype} options={target_type} label={"What is your target ?"} disabled={this.state.isUser} />
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                {this.state.visible === true ?
                    <Grid container className={classes.space} spacing={3}>
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
                        <Grid item xs={4}>
                            <Grid item xs={12}>
                                <TagInput label={"User Name"} getData={this.getUserName} />
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid item xs={12}>
                                <TagInput label={"All Words"} getData={this.getAllWords} />
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid item xs={12}>
                                <TagInput label={"Any Words"} getData={this.getAnyWords} />
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid item xs={12}>
                                <TagInput label={"Not Words"} getData={this.getNotWords} />
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid item xs={12}>
                                <TagInput label={"HashTags"} getData={this.getHashtags} />
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid item xs={12}>
                                <TagInput label={"Reply To"} getData={this.getReplyTo} />
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
                                            <SelectField getValue={this.getNumTweets} options={dict} label={"Total Tweets"} />
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
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <Typography>  Select Location:</Typography>
                                <Grid item xs={12}>
                                    <GoogleMap />
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                onClick={this.startJob}
                                className={classes.signInButton}
                                color="primary"
                                size="large"
                                variant="contained"
                            >
                                Start Job
                    </Button>
                        </Grid>
                    </Grid>
                    : null}
                {this.state.isInfo === true ?
                    <Grid container spacing={3} >
                        <Grid item xs={9}>
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
                                    Start Job
                    </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                    : null}
            </Grid>
        );
    }
}

Twitter.propTypes = {
    className: PropTypes.string,
};

export default withStyles(styles)(Twitter);

