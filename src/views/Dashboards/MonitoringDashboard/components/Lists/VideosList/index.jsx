import React, { Component } from 'react';
// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
// Material helpers
import { CircularProgress, FormControlLabel, Grid, withStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import {
  ChatBubbleOutlineOutlined as ChatBubbleOutlineOutlinedIcon,
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  FilterListOutlined as FilterListOutlinedIcon,
  RepeatOutlined as RepeatOutlinedIcon,
  TurnedIn as TurnedInIcon
} from '@material-ui/icons';
import { Dashboard as DashboardLayout } from 'layouts';
// Component styles
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
// Shared components
import { Portlet, PortletContent, PortletHeader, PortletToolbar } from 'components';
import { toast } from 'react-toastify';
import { Message, optionsError } from '../../../../../../constants/constants';
import NoRecords from '../../../../../NoRecords';

// local json
import dataJSON from './keyword_data.json';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';

class VideosList extends Component {



  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: []
    };
    this.tempData = [];
    this.user = JSON.parse(localStorage.getItem('user'));
    this.project_id = localStorage.getItem('project_id');
  }

  async getTweets() {
    try {
      this.setState({ isLoading: true });
      // const response = await fetch(dataJSON)
      // const data = await response;
      console.log('here',dataJSON);
      if (this.signal) {
        this.setState({
          isLoading: false,
          data: dataJSON
        }, () => {
          this.tempData = [...this.state.data];
        });
      }
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
      };
    }
  }
  // showAlert() {
  //   alert("Im an alert");
  // }

// video link get from keyword type
//   videoLink=()=> {
//    alert("hello")
//   }

  render() {

    const { classes, className, ...rest } = this.props;
    const rootClassName = classNames(classes.root, className);
    this.job = JSON.parse(localStorage.getItem('job'));
    const { isLoading, data } = this.state;
    const showTweets = !isLoading && data;


    return (
      <div className={classes.root}>
        {
          data.map(tweet => (
        <Portlet className={classes.listItem}>
          <PortletHeader noDivider className={classes.header}>
            <Typography variant="h2">Keywords Search Result</Typography>
          </PortletHeader>
          <PortletContent
            noPadding
          >
            {!showTweets ? (
              <div>
                {isLoading ? (<div className={classes.progressWrapper}>
                  <CircularProgress/>
                </div>) : (< NoRecords title={'No Videos Found for this keyword'}
                                       subTitle={'Try another keyword maybe.TRY AGAIN!'}
                />)
                }
              </div>
            ) : (<Grid
              item
              xs={12}
            >

                  <React.Fragment>
                    <Portlet>
                      <PortletContent
                        noPadding
                      >
                        <ListItem button alignItems="flex-start" component="a"
                                  onClick={()=>this.props.getVideoLink()}>
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={tweet.thumbnail}
                                    className={classes.bigAvatar}/>
                          </ListItemAvatar>
                          <ListItemText
                            primary={tweet.title}
                            secondary={
                              <React.Fragment>
                                <div className={classes.details}>
                                  <div className={classes.info}>
                                    <div className={classes.viewsBody}>
                                      <div>
                                        <Typography variant="h4">Channel Name</Typography>
                                        <Typography
                                          className={classes.username}
                                          variant="body1">{tweet.channel_name}</Typography>
                                      </div>
                                      <div className={classes.followers}>
                                        <div>
                                          <Typography variant="h4">Views</Typography>
                                          <Typography
                                            className={classes.username}
                                            variant="body1">{tweet.views}</Typography>
                                        </div>
                                      </div>
                                    </div>
                                    <div className={classes.details1}>
                                      <TodayOutlinedIcon className={classes.icon}/>
                                      <Typography
                                        className={classes.locationText}
                                        variant="body1"
                                      >{tweet.date}
                                      </Typography>
                                    </div>
                                    <div className={classes.details1}>
                                      <PermIdentityOutlinedIcon className={classes.icon}/>
                                      <Typography
                                        className={classes.locationText}
                                        variant="body1"
                                      >{tweet.link}
                                      </Typography>
                                    </div>
                                    <div className={classes.details1}>
                                      <DescriptionOutlinedIcon className={classes.icon}/>
                                      <Typography
                                        className={classes.locationText}
                                        variant="body1"
                                      >
                                        {tweet.description}
                                      </Typography>
                                    </div>
                                  </div>
                                </div>
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                      </PortletContent>
                    </Portlet>
                  </React.Fragment>

            </Grid>)}
          </PortletContent>
        </Portlet>
          ))
        }
      </div>
    );
  }

}

VideosList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(VideosList);
