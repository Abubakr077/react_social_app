import React, {Component} from 'react';
// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
// Material helpers
import {
    Grid,
    withStyles
} from '@material-ui/core';

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
    PortletContent
} from 'components';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import RepeatOutlinedIcon from '@material-ui/icons/RepeatOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";


// local json
import totalPositiveInfoTweets
    from '../JobAnalysis/data/info/100_processed_total_positive_TWITTER_USER_POST_2019-09-19.json';
import totalNegativeInfoTweets
    from '../JobAnalysis/data/info/100_processed_total_negative_TWITTER_USER_POST_2019-09-19.json';
import totalTwitterTweets from
        '../JobAnalysis/data/info/100_processed_date_total_TWITTER_USER_POST_2019-09-19.json';
import positiveLineTweets from
        '../JobAnalysis/data/info/100_processed_date_positive_TWITTER_USER_POST_2019-09-19.json';
import negativeLineTweets from
        '../JobAnalysis/data/info/100_processed_date_negative_TWITTER_USER_POST_2019-09-19.json';
import totalPositiveTrendsTweets
    from '../JobAnalysis/data/trends/100_processed_total_positive_TWITTER_USER_POST_2019-09-19.json';
import totalNegativeTrendsTweets
    from '../JobAnalysis/data/trends/100_processed_total_negative_TWITTER_USER_POST_2019-09-19.json';
import totalTwitterTrendTweets from
        '../JobAnalysis/data/trends/100_processed_date_total_TWITTER_USER_POST_2019-09-19.json';
import positiveLineTrendTweets from
        '../JobAnalysis/data/trends/100_processed_date_positive_TWITTER_USER_POST_2019-09-19.json';
import negativeLineTrendTweets from
        '../JobAnalysis/data/trends/100_processed_date_negative_TWITTER_USER_POST_2019-09-19.json';
import assocTrendTweets from
        '../JobAnalysis/data/trends/100_processed_assoc_TWITTER_USER_POST_2019-09-19.json';
import assocInfoTweets from
        '../JobAnalysis/data/info/100_processed_assoc_TWITTER_USER_POST_2019-09-19.json';



class TweetsList extends Component {

    render() {

        const {classes, className, ...rest} = this.props;
        const rootClassName = classNames(classes.root, className);
        const prevState = this.props.location.state;

        let tweetType,data;
        if (prevState.tweets === 'total') {
            tweetType = 'total'
        } else {
            tweetType = (prevState.tweets === 'negative') ? 'negative' : 'positive';
        }

        if (prevState) {
            if (prevState.type === 'INFO') {
                if (prevState.visual === 'line') {
                    if (tweetType === 'total') {
                        data = totalTwitterTweets;
                    } else if (tweetType === 'negative') {
                        data = positiveLineTweets;
                    } else if (tweetType === 'positive') {
                        data = negativeLineTweets;
                    }
                } else if (prevState.visual === 'pie') {
                    if (tweetType === 'negative') {
                        data = totalNegativeInfoTweets;
                    } else if (tweetType === 'positive') {
                        data = totalPositiveInfoTweets;
                    }

                } else if (prevState.visual === 'assoc'){
                    data = assocInfoTweets;
                    tweetType = prevState.tweets;
                }
            } else if (prevState.type === 'POSTS') {
                if (prevState.visual === 'line') {
                    if (tweetType === 'total') {
                        data = totalTwitterTrendTweets;
                    } else if (tweetType === 'positive') {
                        data = negativeLineTrendTweets;
                    } else if (tweetType === 'negative') {
                        data = positiveLineTrendTweets;
                    }
                } else if (prevState.visual === 'pie') {
                    if (tweetType === 'negative') {
                        data = totalNegativeTrendsTweets;
                    } else if (tweetType === 'positive') {
                        data = totalPositiveTrendsTweets;
                    }

                } else if (prevState.visual === 'assoc'){
                    data = assocTrendTweets;
                    tweetType = prevState.tweets;
                }
            }
        }

        return (
            <DashboardLayout className={rootClassName}
                             title={prevState.target_type + " TWEETS"}
                             initUser={false}
                             options={{
                                 isTweetsRoute: true
                             }}
            >
                <div className={classes.root}>
                    <Portlet className={classes.listItem}>
                        <PortletHeader noDivider>
                            <Typography variant="h2">{tweetType} Tweets</Typography>
                        </PortletHeader>
                        <PortletContent
                            noPadding
                        >
                            <Grid
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
                                                              href={'https://twitter.com' + tweet.url}>
                                                        <ListItemAvatar>
                                                            <Avatar alt="Remy Sharp" src={tweet.user_image}/>
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
                                                                                    {tweet.nbr_reply}
                                                                                </Typography>
                                                                            </div>
                                                                            <div className={classes.inlineText}>
                                                                                <RepeatOutlinedIcon
                                                                                    className={classes.marginLeft}/>
                                                                                <Typography className={classes.text}
                                                                                            variant="caption2">
                                                                                    {tweet.nbr_retweet}
                                                                                </Typography>
                                                                            </div>
                                                                            <div className={classes.inlineText}>
                                                                                <FavoriteBorderOutlinedIcon
                                                                                    className={classes.marginLeft}/>
                                                                                <Typography className={classes.text}
                                                                                            variant="caption2">
                                                                                    {tweet.nbr_favorite}
                                                                                </Typography>
                                                                            </div>
                                                                            <FormControlLabel
                                                                                className={classes.marginLeft}
                                                                                control={
                                                                                    <Checkbox
                                                                                        checked={tweet.is_reply}
                                                                                        value="checkedB"
                                                                                        color="primary"
                                                                                    />
                                                                                }
                                                                                label="is Replay"
                                                                                labelPlacement="end"
                                                                            />
                                                                            <FormControlLabel
                                                                                className={classes.marginLeft}
                                                                                control={
                                                                                    <Checkbox
                                                                                        checked={tweet.is_retweet}
                                                                                        value="checkedB"
                                                                                        color="primary"
                                                                                    />
                                                                                }
                                                                                label="retweet"
                                                                                labelPlacement="end"
                                                                            />
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

                            </Grid>
                        </PortletContent>
                    </Portlet>

                </div>
            </DashboardLayout>
        );
    }

    handleClick() {

    }
}

TweetsList.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TweetsList);
