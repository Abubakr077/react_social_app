import React, {Component} from 'react';
// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
// Material helpers
import {
    Grid,
    FormControlLabel,
    withStyles, CircularProgress
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import {
    ArrowDropDown as ArrowDropDownIcon,
    ArrowRight as ArrowRightIcon,
    TurnedIn as TurnedInIcon,
    FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
    RepeatOutlined as RepeatOutlinedIcon,
    ChatBubbleOutlineOutlined as ChatBubbleOutlineOutlinedIcon, Input,
    FilterListOutlined as FilterListOutlinedIcon

} from '@material-ui/icons';
import {
    Dashboard as DashboardLayout

} from 'layouts';
// Component styles
import styles from './styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
// Shared components
import {
    Portlet,
    PortletHeader,
    PortletFooter,
    PortletToolbar,
    PortletContent
} from 'components';
import request from 'helpers/request.js';
import * as endpoints from 'constants/endpoints.json';

// local json
import totalPositiveInfoTweets
    from '../../JobAnalysis/data/info/100_processed_total_positive_TWITTER_USER_POST_2019-09-19.json';
import totalNegativeInfoTweets
    from '../../JobAnalysis/data/info/100_processed_total_negative_TWITTER_USER_POST_2019-09-19.json';
import totalTwitterTweets from
        '../../JobAnalysis/data/info/100_processed_date_total_TWITTER_USER_POST_2019-09-19';
import positiveLineTweets from
        '../../JobAnalysis/data/info/100_processed_date_positive_TWITTER_USER_POST_2019-09-19.json';
import negativeLineTweets from
        '../../JobAnalysis/data/info/100_processed_date_negative_TWITTER_USER_POST_2019-09-19.json';
import totalPositiveTrendsTweets
    from '../../JobAnalysis/data/trends/100_processed_total_positive_TWITTER_USER_POST_2019-09-19.json';
import totalNegativeTrendsTweets
    from '../../JobAnalysis/data/trends/100_processed_total_negative_TWITTER_USER_POST_2019-09-19.json';
import totalTwitterTrendTweets from
        '../../JobAnalysis/data/trends/100_processed_date_total_TWITTER_USER_POST_2019-09-19.json';
import positiveLineTrendTweets from
        '../../JobAnalysis/data/trends/100_processed_date_positive_TWITTER_USER_POST_2019-09-19.json';
import negativeLineTrendTweets from
        '../../JobAnalysis/data/trends/100_processed_date_negative_TWITTER_USER_POST_2019-09-19.json';
import assocTrendTweets from
        '../../JobAnalysis/data/trends/100_processed_assoc_TWITTER_USER_POST_2019-09-19.json';
import assocInfoTweets from
        '../../JobAnalysis/data/info/100_processed_assoc_TWITTER_USER_POST_2019-09-19.json';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import useTheme from "@material-ui/core/styles/useTheme";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import {toast} from "react-toastify";
import {Message, optionsError} from "../../../../../../constants/constants";
import NoRecords from "../../../../../NoRecords";


class YoutubeComments extends Component {

    state = {
        isLoading: false,
        filters: [{
            id: 1234,
            name: 'Most Retweets',
            checked: false,
            type: 'nbr_retweet'
        },
            {
                id: 4321,
                name: 'Most Likes',
                checked: false,
                type: 'nbr_favorite'
            },
            {
                id: 1111,
                name: 'Most Replies',
                checked: false,
                type: 'nbr_reply'
            }],
        data: []
    };
    tweetType = '';
    tempData = [];

    constructor(props) {
        super(props);
        this.prevState = this.props.location.state;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.project_id = localStorage.getItem('project_id');
        if (this.prevState.tweets === 'total') {
            this.tweetType = 'total'
        } else {
            this.tweetType = (this.prevState.tweets === 'negative') ? 'negative' : 'positive'
        }
        if (this.prevState) {
            // if (this.prevState.type === 'INFO') {
            if (this.prevState.visual === 'line') {
                this.endPoint = endpoints.getLineTweets + this.prevState.taskId;
                this.params = {
                    type: this.tweetType.toUpperCase(),
                    datetime: this.prevState.payload.date
                }
            } else if (this.prevState.visual === 'assoc') {
                this.endPoint = endpoints.getAssocTweets + this.prevState.taskId;
                this.tweetType = this.prevState.tweets;
                this.params = {
                    assoc_str: this.tweetType
                }
            }
            // } else if (this.prevState.type === 'POSTS') {
            //     if (this.prevState.visual === 'line') {
            //
            //     } else if (this.prevState.visual === 'assoc') {
            //         this.state.data = assocTrendTweets;
            //         this.tweetType = this.prevState.tweets
            //     }
            // }
        }
    }

    async getTweets() {

        try {

            this.setState({isLoading: true});

            await request({
                url: this.endPoint,
                method: 'GET',
                headers: {
                    user_id: this.user.id,
                    x_auth_token: this.user.x_auth_token.token,
                    project_id: this.project_id
                },
                params: this.params
            }).then((res) => {
                // localStorage.setItem('invites', JSON.stringify(res.project_invites));
                if (this.signal) {
                    this.setState({
                        isLoading: false,
                        data: res
                    },()=>{
                        this.tempData = [...this.state.data];
                    });
                }
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

    componentDidMount() {
        this.signal = true;
        window.scrollTo(0, 0);
        this.getTweets();
    }

    componentWillUnmount() {
        this.signal = false;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state !== prevState) {
            const recursive = () => {
                setTimeout(() => {
                    let hasMore = this.state.data.length + 1 < prevState.data.length;
                    this.setState((prev, props) => ({
                        data: prevState.data.slice(0, prevState.data.length + 1)
                    }));
                    if (hasMore) recursive();
                }, 0);
            }
        }
    }

    render() {

        const {classes, className, ...rest} = this.props;
        const rootClassName = classNames(classes.root, className);
        this.prevState = this.props.location.state;
        const {isLoading, data} = this.state;
        const showTweets = !isLoading && data;


        return (
            <DashboardLayout className={rootClassName}
                             title={this.prevState.target_type + " Comments"}
                             initUser={false}
                             options={{
                                 isTweetsRoute: true
                             }}
            >
                <div className={classes.root}>
                    <Portlet className={classes.listItem}>
                        <PortletHeader noDivider className={classes.header}>
                            <Typography variant="h2">{this.tweetType} Comments</Typography>
                            <PortletToolbar className={classes.filterBody}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Filter</InputLabel>
                                    <Select
                                        inputProps={{
                                            name: 'filter',
                                            id: 'age-simple',
                                        }}
                                        IconComponent={() => (
                                            <FilterListOutlinedIcon/>
                                        )}
                                    >
                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <FormLabel component="legend">Filter</FormLabel>
                                            <FormGroup>
                                                {
                                                    this.state.filters.map((filter) =>
                                                        <FormControlLabel
                                                            control={<Checkbox
                                                                onChange={() => this.handleChange(filter)}
                                                                checked={filter.checked} value={filter.id}/>}
                                                            label={filter.name}
                                                        />
                                                    )
                                                }
                                            </FormGroup>
                                            <FormHelperText>choose any to update list</FormHelperText>
                                        </FormControl>

                                    </Select>
                                </FormControl>
                            </PortletToolbar>
                        </PortletHeader>
                        <PortletContent
                            noPadding
                        >
                            {!showTweets ? (
                                <div>
                                    {isLoading ? (<div className={classes.progressWrapper}>
                                        <CircularProgress/>
                                    </div>) : (< NoRecords title={'No comments Found for this task'}
                                        // subTitle={'Invites will show, if some owner send you one'}
                                    />)
                                    }
                                </div>
                            ) : (<Grid
                                item
                                xs={12}
                            >
                                {
                                    data.map(tweet => (
                                        <React.Fragment>
                                            <Portlet>
                                                <PortletContent
                                                    noPadding
                                                >
                                                    <ListItem button alignItems="flex-start" component="a"
                                                              href={ tweet.comment_user_image}>
                                                        <ListItemAvatar>
                                                            <Avatar alt="Remy Sharp" src={tweet.comment_user_image}
                                                                    className={classes.bigAvatar}/>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={tweet.user_name}
                                                            secondary={
                                                                <React.Fragment>
                                                                    <div className={classes.details}>
                                                                        <Typography
                                                                            component="span"
                                                                            variant="body2"
                                                                            className={classes.inline}
                                                                            color="textPrimary"
                                                                        >
                                                                            {tweet.datetime}
                                                                        </Typography>
                                                                        {tweet.text}
                                                                        <div className={classes.actions}>
                                                                            <div className={classes.inlineText}>
                                                                                <ChatBubbleOutlineOutlinedIcon/>
                                                                                <Typography className={classes.text}
                                                                                            variant="caption2">
                                                                                    {tweet.replies}
                                                                                </Typography>
                                                                            </div>
                                                                            <div className={classes.inlineText}>
                                                                                <FavoriteBorderOutlinedIcon
                                                                                    className={classes.marginLeft}/>
                                                                                <Typography className={classes.text}
                                                                                            variant="caption2">
                                                                                    {tweet.likes}
                                                                                </Typography>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </React.Fragment>
                                                            }
                                                        />
                                                        {tweet.is_hate !== "0" ?
                                                            (<TurnedInIcon className={classes.cancelButton}/>) :
                                                            (<TurnedInIcon className={classes.acceptButton}/>)}
                                                    </ListItem>
                                                </PortletContent>
                                            </Portlet>
                                            {/*<Divider variant="inset" />*/}
                                        </React.Fragment>
                                    ))
                                }

                            </Grid>)}
                        </PortletContent>
                    </Portlet>

                </div>
            </DashboardLayout>
        );
    }


    handleChange(filter) {
        if (!filter.checked) {
            if (filter.type === 'nbr_reply') {
                this.state.data = this.state.data.sort((a, b) => {
                    return b.nbr_reply - a.nbr_reply;
                });

            }
            if (filter.type === 'nbr_retweet') {
                this.state.data = this.state.data.sort((a, b) => {
                    return b.nbr_retweet - a.nbr_retweet;
                });
            }
            if (filter.type === 'nbr_favorite') {
                this.state.data = this.state.data.sort((a, b) => {
                    return b.nbr_favorite - a.nbr_favorite;
                });
            }
        } else {
            // this.setState({
            //     data: this.tempData
            // },()=>{
            //     console.log(this.state.data);
            // })
            this.state.data = [...this.tempData];
        }
        this.setState({
            filters: this.state.filters.map(el => (el.id === filter.id ?
                Object.assign({}, el, {checked: !el.checked})
                : el))
        });
    }

}

YoutubeComments.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(YoutubeComments);
