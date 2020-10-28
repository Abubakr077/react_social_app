import React, { Component } from 'react';
// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
// Material helpers
import {
  Button,
  CircularProgress,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  withStyles
} from '@material-ui/core';

import { Dashboard as DashboardLayout } from 'layouts';
// Component styles
import styles from './styles';


import FormControl from '@material-ui/core/FormControl';

import Paper from '@material-ui/core/Paper';
import Twitter from '../CreateJob/Twitter';
import Youtube from '../CreateJob/Youtube';
import Like from '../CreateJob/Like';
import Facebook from '../CreateJob/Facebook';
import Keyword from '../NetworkGraph/Components/Keyword';
import UploadFile from './Components/UploadFile';




class NetworkGraph extends Component {
  // state = { showing: false };
  constructor(props) {
    super(props);


    this.handleChange = this.handleChange.bind(this);
  }

  signal = false;
  state = {
    value: 'keyword'
    // value: 'youtube',
  };

  handleChange(event) {
    console.log(event.target.value);
    this.setState({
      value: event.target.value
    });
  }
  render() {
    const { showing } = this.state;
    const { classes, className, ...rest } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (


      <DashboardLayout title={'Search By ' + this.state.value } initUser={false}>
        <Paper className={classes.paper}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Please Select Method</FormLabel>
            <RadioGroup
              row
              aria-label="Please Select Method"
              name="platform"
              className={classes.group}
              value={this.state.value}
              onChange={this.handleChange}
            >

              <FormControlLabel
                className={classes.platformTwitter}
                value="keyword"
                control={<Radio color="primary"/>}
                label="Keyword"
              />
              <FormControlLabel
                className={classes.platformInsta}
                value="upload"
                control={<Radio color="primary"/>}
                label="Upload File"
              />

            </RadioGroup>
          </FormControl>
          {this.state.value === 'keyword' ? <Keyword/> :
            this.state.value === 'upload' ? (
                <UploadFile />
              ):
              this.state.value === 'like' ? (
                  <Like/>
                )
                : <Facebook/>

          }
        </Paper>

      </DashboardLayout>


    );
  }
}

NetworkGraph.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NetworkGraph);

