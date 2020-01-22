import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TagInput from '../TagInput';
import GoogleMap from '../GoogleMap';

const classes = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));


class SimpleExpansionPanel extends Component {
  getUserName = (username) => {
    console.log(username.tags);
  };
  getAllWords = (words) => {
    console.log(words.tags);
  };
  getAnyWords = (words) => {
    console.log(words.tags);
  };
  getNotWords = (words) => {
    console.log(words.tags);
  };
  getHashtags = (hashtags) => {
    console.log(hashtags.tags);
  };
  getReplyTo = (user) => {
    console.log(user.tags);
  };
  getMentionedUsers = (user) => {
    console.log(user.tags);
  };

  render() {
    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Twitter</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              User Name:
              <TagInput getData={this.getUserName}/>
              <br/>
              All Words:
              <TagInput getData={this.getAllWords}/>
              <br/>
              Any Words:
              <TagInput getData={this.getAnyWords}/>
              <br/>
              Not Words:
              <TagInput getData={this.getNotWords}/>
              <br/>
              HashTags:
              <TagInput getData={this.getHashtags}/>
              <br/>
              Reply To:
              <TagInput getData={this.getReplyTo}/>
              <br/>
              Mentioned Users:
              <TagInput getData={this.getMentionedUsers}/>
              <br/>
              Select Location:
              <div>
                <GoogleMap/>
              </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Facebook</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>Instagram</Typography>
          </ExpansionPanelSummary>
        </ExpansionPanel>
      </div>
    );
  }
}

export default SimpleExpansionPanel;