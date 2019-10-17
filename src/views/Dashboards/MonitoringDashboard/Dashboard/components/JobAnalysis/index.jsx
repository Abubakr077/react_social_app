import React, {Component} from 'react';

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
    PortletFooter,
    PortletToolbar
} from 'components';

// Component styles
import styles from './styles';

// Shared Resources
import compose from "recompose/compose";
import PNTweetsLine from "../Graphs/PNTweetsLine";
import PNTweetsPie from "../Graphs/PNTweetsPie";
import {WordClouds} from "../index";
import PNTweetsArea from "../Graphs/PNTweetsArea";
import AccountProfile from "../AccountProfile";


// local json
import trendsData from './data/trends/500_analytics_handler_TWITTER_USER_POST_2019-09-19.json'
import Button from "@material-ui/core/Button";
import {withRouter} from "react-router-dom";
import NoRecords from "../../../../../NoRecords";

class JobAnalysis extends Component {

    state = {
        isLoading: true,
        data: null
    };


    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        const {classes, className, ...rest} = this.props;
        const rootClassName = classNames(classes.root, className);
        const job = JSON.parse(localStorage.getItem('job'));
        console.log(job);
        const prevState = this.props.location.state;
        let data;
        if (prevState){
            if (prevState.data){
                data = prevState.data;
            }else {
                data = {
                    "info_data": {
                        "job_id": "101",
                        "user_id": "138340856",
                        "user_name": "Mohsin Dawar",
                        "user_screen_name": "mjdawar",
                        "user_avatar": "https://pbs.twimg.com/profile_images/736651661926621184/xmpX-0B6_bigger.jpg",
                        "user_image": "https://pbs.twimg.com/profile_images/736651661926621184/xmpX-0B6_400x400.jpg",
                        "user_count_tweets": "28032",
                        "user_count_following": "545",
                        "user_count_followers": "157215",
                        "user_desc": "Member National Assembly NA-48-North Waziristan. Pushtoon-Tahafuz-Movement, Writer, Lawyer_Peshawar-High Court.",
                        "user_location": "North Waziristan/Peshawar",
                        "item_type": "INFO"
                    },
                    "results": {
                        "unique_word_freq": [
                            {
                                "text": "ptm",
                                "value": 15
                            },
                            {
                                "text": "ptmstandswithgulalaiismail",
                                "value": 12
                            },
                            {
                                "text": "case",
                                "value": 9
                            },
                            {
                                "text": "law",
                                "value": 9
                            },
                            {
                                "text": "waziristan",
                                "value": 8
                            },
                            {
                                "text": "today",
                                "value": 8
                            },
                            {
                                "text": "stopthreateningptm",
                                "value": 7
                            },
                            {
                                "text": "terrorism",
                                "value": 7
                            },
                            {
                                "text": "bill",
                                "value": 7
                            },
                            {
                                "text": "protest",
                                "value": 6
                            },
                            {
                                "text": "struggle",
                                "value": 6
                            },
                            {
                                "text": "fir",
                                "value": 6
                            },
                            {
                                "text": "strongly",
                                "value": 6
                            },
                            {
                                "text": "fata",
                                "value": 6
                            },
                            {
                                "text": "pakistan",
                                "value": 6
                            },
                            {
                                "text": "wd",
                                "value": 6
                            },
                            {
                                "text": "pashtun",
                                "value": 6
                            },
                            {
                                "text": "north",
                                "value": 5
                            },
                            {
                                "text": "like",
                                "value": 5
                            },
                            {
                                "text": "country",
                                "value": 5
                            },
                            {
                                "text": "twitter.com/mjdawar/status",
                                "value": 5
                            },
                            {
                                "text": "state",
                                "value": 5
                            },
                            {
                                "text": "need",
                                "value": 5
                            },
                            {
                                "text": "political",
                                "value": 5
                            },
                            {
                                "text": "hope",
                                "value": 5
                            },
                            {
                                "text": "seats",
                                "value": 5
                            },
                            {
                                "text": "ptmzindabad",
                                "value": 5
                            },
                            {
                                "text": "oppressed",
                                "value": 4
                            },
                            {
                                "text": "pashtuns",
                                "value": 4
                            },
                            {
                                "text": "justice",
                                "value": 4
                            },
                            {
                                "text": "teammohsindawar",
                                "value": 4
                            },
                            {
                                "text": "people",
                                "value": 4
                            },
                            {
                                "text": "allowed",
                                "value": 4
                            },
                            {
                                "text": "news",
                                "value": 4
                            },
                            {
                                "text": "loralai",
                                "value": 4
                            },
                            {
                                "text": "force",
                                "value": 4
                            },
                            {
                                "text": "violence",
                                "value": 4
                            },
                            {
                                "text": "military",
                                "value": 4
                            },
                            {
                                "text": "sharamnak",
                                "value": 4
                            },
                            {
                                "text": "police",
                                "value": 4
                            },
                            {
                                "text": "islamabad",
                                "value": 4
                            },
                            {
                                "text": "shows",
                                "value": 4
                            },
                            {
                                "text": "condemn",
                                "value": 4
                            },
                            {
                                "text": "act",
                                "value": 4
                            },
                            {
                                "text": "time",
                                "value": 4
                            },
                            {
                                "text": "making",
                                "value": 4
                            },
                            {
                                "text": "constitution",
                                "value": 4
                            },
                            {
                                "text": "given",
                                "value": 4
                            },
                            {
                                "text": "night",
                                "value": 4
                            },
                            {
                                "text": "know",
                                "value": 4
                            },
                            {
                                "text": "missing",
                                "value": 4
                            },
                            {
                                "text": "increase",
                                "value": 4
                            },
                            {
                                "text": "assembly",
                                "value": 4
                            },
                            {
                                "text": "ispr",
                                "value": 4
                            },
                            {
                                "text": "press",
                                "value": 4
                            },
                            {
                                "text": "democracy",
                                "value": 4
                            },
                            {
                                "text": "Urdu",
                                "value": 4
                            },
                            {
                                "text": "mna",
                                "value": 3
                            },
                            {
                                "text": "qayum",
                                "value": 3
                            },
                            {
                                "text": "civilians",
                                "value": 3
                            },
                            {
                                "text": "keeps",
                                "value": 3
                            },
                            {
                                "text": "personnel",
                                "value": 3
                            },
                            {
                                "text": "operation",
                                "value": 3
                            },
                            {
                                "text": "condemnable",
                                "value": 3
                            },
                            {
                                "text": "voice",
                                "value": 3
                            },
                            {
                                "text": "media",
                                "value": 3
                            },
                            {
                                "text": "called",
                                "value": 3
                            },
                            {
                                "text": "enforced",
                                "value": 3
                            },
                            {
                                "text": "long",
                                "value": 3
                            },
                            {
                                "text": "real",
                                "value": 3
                            },
                            {
                                "text": "rights",
                                "value": 3
                            },
                            {
                                "text": "Medina",
                                "value": 3
                            },
                            {
                                "text": "work",
                                "value": 3
                            },
                            {
                                "text": "peaceful",
                                "value": 3
                            },
                            {
                                "text": "The",
                                "value": 3
                            },
                            {
                                "text": "stopthreatningptm",
                                "value": 3
                            },
                            {
                                "text": "thanks",
                                "value": 3
                            },
                            {
                                "text": "words",
                                "value": 3
                            },
                            {
                                "text": "criminal",
                                "value": 3
                            },
                            {
                                "text": "life",
                                "value": 3
                            },
                            {
                                "text": "officer",
                                "value": 3
                            },
                            {
                                "text": "came",
                                "value": 3
                            },
                            {
                                "text": "message",
                                "value": 3
                            },
                            {
                                "text": "@bbhuttozardari",
                                "value": 3
                            },
                            {
                                "text": "parliament",
                                "value": 3
                            },
                            {
                                "text": "federation",
                                "value": 3
                            },
                            {
                                "text": "taliban",
                                "value": 3
                            },
                            {
                                "text": "twitter.com/peaceforchange",
                                "value": 3
                            },
                            {
                                "text": "sahib",
                                "value": 3
                            },
                            {
                                "text": "condolences",
                                "value": 3
                            },
                            {
                                "text": "goes",
                                "value": 3
                            },
                            {
                                "text": "needs",
                                "value": 3
                            },
                            {
                                "text": "thank",
                                "value": 3
                            },
                            {
                                "text": "amendment",
                                "value": 3
                            },
                            {
                                "text": "ex",
                                "value": 3
                            },
                            {
                                "text": "support",
                                "value": 3
                            },
                            {
                                "text": "anger",
                                "value": 3
                            },
                            {
                                "text": "exposed",
                                "value": 3
                            },
                            {
                                "text": "care",
                                "value": 3
                            },
                            {
                                "text": "presented",
                                "value": 3
                            }
                        ],
                        "polarity_freq": [
                            {
                                "date": "2019-04-15",
                                "total": 3,
                                "positive": 1,
                                "negative": 2
                            },
                            {
                                "date": "2019-04-16",
                                "total": 2,
                                "positive": 1,
                                "negative": 1
                            },
                            {
                                "date": "2019-04-17",
                                "total": 2,
                                "positive": 2,
                                "negative": 0
                            },
                            {
                                "date": "2019-04-19",
                                "total": 4,
                                "positive": 2,
                                "negative": 2
                            },
                            {
                                "date": "2019-04-21",
                                "total": 1,
                                "positive": 0,
                                "negative": 1
                            },
                            {
                                "date": "2019-04-23",
                                "total": 3,
                                "positive": 2,
                                "negative": 0
                            },
                            {
                                "date": "2019-04-24",
                                "total": 2,
                                "positive": 1,
                                "negative": 1
                            },
                            {
                                "date": "2019-04-25",
                                "total": 1,
                                "positive": 1,
                                "negative": 0
                            },
                            {
                                "date": "2019-04-26",
                                "total": 4,
                                "positive": 3,
                                "negative": 1
                            },
                            {
                                "date": "2019-04-27",
                                "total": 1,
                                "positive": 0,
                                "negative": 1
                            },
                            {
                                "date": "2019-04-28",
                                "total": 2,
                                "positive": 2,
                                "negative": 0
                            },
                            {
                                "date": "2019-04-29",
                                "total": 1,
                                "positive": 1,
                                "negative": 0
                            },
                            {
                                "date": "2019-04-30",
                                "total": 9,
                                "positive": 9,
                                "negative": 0
                            },
                            {
                                "date": "2019-05-01",
                                "total": 3,
                                "positive": 2,
                                "negative": 1
                            },
                            {
                                "date": "2019-05-02",
                                "total": 1,
                                "positive": 1,
                                "negative": 0
                            },
                            {
                                "date": "2019-05-03",
                                "total": 2,
                                "positive": 2,
                                "negative": 0
                            },
                            {
                                "date": "2019-05-04",
                                "total": 1,
                                "positive": 1,
                                "negative": 0
                            },
                            {
                                "date": "2019-05-05",
                                "total": 1,
                                "positive": 0,
                                "negative": 0
                            },
                            {
                                "date": "2019-05-06",
                                "total": 2,
                                "positive": 2,
                                "negative": 0
                            },
                            {
                                "date": "2019-05-08",
                                "total": 1,
                                "positive": 0,
                                "negative": 1
                            },
                            {
                                "date": "2019-05-10",
                                "total": 5,
                                "positive": 5,
                                "negative": 0
                            },
                            {
                                "date": "2019-05-11",
                                "total": 4,
                                "positive": 4,
                                "negative": 0
                            },
                            {
                                "date": "2019-05-13",
                                "total": 1,
                                "positive": 1,
                                "negative": 0
                            },
                            {
                                "date": "2019-05-15",
                                "total": 1,
                                "positive": 0,
                                "negative": 1
                            },
                            {
                                "date": "2019-05-17",
                                "total": 1,
                                "positive": 1,
                                "negative": 0
                            },
                            {
                                "date": "2019-05-18",
                                "total": 1,
                                "positive": 0,
                                "negative": 1
                            },
                            {
                                "date": "2019-05-19",
                                "total": 2,
                                "positive": 1,
                                "negative": 1
                            },
                            {
                                "date": "2019-05-20",
                                "total": 3,
                                "positive": 3,
                                "negative": 0
                            },
                            {
                                "date": "2019-05-21",
                                "total": 5,
                                "positive": 0,
                                "negative": 4
                            },
                            {
                                "date": "2019-05-22",
                                "total": 3,
                                "positive": 2,
                                "negative": 1
                            },
                            {
                                "date": "2019-05-23",
                                "total": 16,
                                "positive": 9,
                                "negative": 4
                            },
                            {
                                "date": "2019-05-24",
                                "total": 2,
                                "positive": 2,
                                "negative": 0
                            },
                            {
                                "date": "2019-05-25",
                                "total": 5,
                                "positive": 4,
                                "negative": 1
                            },
                            {
                                "date": "2019-05-26",
                                "total": 1,
                                "positive": 0,
                                "negative": 1
                            },
                            {
                                "date": "2019-08-10",
                                "total": 1,
                                "positive": 1,
                                "negative": 0
                            },
                            {
                                "date": "2019-08-12",
                                "total": 2,
                                "positive": 2,
                                "negative": 0
                            },
                            {
                                "date": "2019-09-17",
                                "total": 1,
                                "positive": 0,
                                "negative": 0
                            },
                        ],
                        "polarity_dist": [
                            {
                                "name": "positive",
                                "value": "68"
                            },
                            {
                                "name": "negative",
                                "value": "25"
                            }
                        ],
                        "assoc": [
                            {
                                "text": "elements_making_mockery",
                                "value": 19
                            },
                            {
                                "text": "special_committee_assures",
                                "value": 19
                            },
                            {
                                "text": "senate_special_committee",
                                "value": 18
                            },
                            {
                                "text": "islamabad_press_club",
                                "value": 18
                            },
                            {
                                "text": "assassinations_waziristan_mark",
                                "value": 18
                            },
                            {
                                "text": "waziristan_mark_taliban",
                                "value": 17
                            },
                            {
                                "text": "assures_ptm_addressing",
                                "value": 17
                            },
                            {
                                "text": "seats_erstwhile_fata",
                                "value": 17
                            },
                            {
                                "text": "committee_assures_ptm",
                                "value": 16
                            },
                            {
                                "text": "seats_increase_fata",
                                "value": 16
                            }
                        ]
                    }
                };
            }
            if (data && data.results){
                this.isWordFreqEmpty = Boolean(Object.keys(data.results.unique_word_freq).length);
                this.isPolarityFreqEmpty = Boolean(Object.keys(data.results.polarity_freq).length);
                this.isPolarityDistEmpty = Boolean(Object.keys(data.results.polarity_dist).length);
                this.isAssocEmpty = Boolean(Object.keys(data.results.assoc).length);
                this.isAccountEmpty = Boolean(Object.keys(data.info_data).length);
            }
        }


        const {
            isLoading
        } = this.state;
        const title = "Analysis of " + job.description;

        return (
            <DashboardLayout className={rootClassName}
                             title={title}
                             initUser={false}>
                {isLoading ? (
                    <div className={classes.root}>
                        {this.isAccountEmpty && (
                            <AccountProfile data={data.info_data}/>
                        )}
                        {data.results ? (
                            <div>
                            <Portlet>
                                <PortletHeader noDivider>
                                    <PortletLabel
                                        title="Twitter Tweets"
                                    />
                                    { prevState.type === 'POSTS' && (<PortletToolbar>
                                        <Button
                                            className={classes.newEntryButton}
                                            color="primary"
                                            size="small"
                                            variant="outlined"
                                            onClick={()=> {
                                                const { history } = this.props;
                                                const url = this.props.match.url;
                                                history.push(url+'/profiles');
                                            }}
                                        >
                                            Hate Pool
                                        </Button>
                                        <Button
                                            className={classes.newEntryButton}
                                            color="primary"
                                            size="small"
                                            variant="outlined"
                                            onClick={()=> {
                                                const { history } = this.props;
                                                const url = this.props.match.url;
                                                history.push(url+'/profiles');
                                            }}
                                        >
                                            Trend Contributors
                                        </Button>
                                    </PortletToolbar>)
                                    }
                                </PortletHeader>
                                <PortletContent
                                    className={classes.contentBody}
                                    noPadding
                                >
                                    {this.isPolarityFreqEmpty && <div className={classes.lineBody}>
                                        <PNTweetsLine data={data.results.polarity_freq}
                                                      type={prevState.type}
                                                      target_type={prevState.target_type}
                                                      taskId= {prevState.taskId}
                                        />
                                    </div>}

                                    {this.isPolarityDistEmpty &&
                                        <div className={classes.pieBody}>
                                        <PNTweetsPie data={data.results.polarity_dist} type={prevState.type} target_type={prevState.target_type}/>
                                    </div>}
                                </PortletContent>

                                { this.isPolarityFreqEmpty && <div className={classes.areaBody}>
                                    <PNTweetsArea  data={data.results.polarity_freq}/>
                                </div>}
                            </Portlet>
                                {this.isAssocEmpty && (
                            <Grid
                                item
                                xs={12}
                            >
                                <WordClouds cloudOptions={{
                                    isWords: false,
                                    title: 'Associations Cloud',
                                    data: data.results.assoc,
                                    target_type: prevState.target_type,
                                    type: prevState.type,
                                    taskId: prevState.taskId
                                }
                                }
                                />
                            </Grid>
                                )}
                            {this.isWordFreqEmpty && <Grid
                                item
                                xs={12}
                            >
                                <WordClouds cloudOptions={{
                                    isWords: true,
                                    title: 'Unique Words Frequency',
                                    data: data.results.unique_word_freq,
                                    target_type: prevState.target_type,
                                    type: prevState.type
                                }}/>
                            </Grid>}
                        </div>
                        ) :
                            (
                                <NoRecords
                                    title={'No Analytical Data to show at this moment'}
                                />
                            )
                        }
                    </div>
                ) : (
                    <div className={classes.progressWrapper}>
                        <CircularProgress/>
                    </div>
                )
                }
            </DashboardLayout>
        );
    }
}


JobAnalysis.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};


export default compose(
    withRouter,
    withStyles(styles)
)
(JobAnalysis);

