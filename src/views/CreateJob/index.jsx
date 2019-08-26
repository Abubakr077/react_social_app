import React, { Component } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core';
// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { ExpentionPanelView } from "./components";

// Material helpers
import {
  withStyles
} from '@material-ui/core';

import {
  Dashboard as DashboardLayout

} from 'layouts';

// Component styles
import styles from './styles';
import { makeStyles } from "@material-ui/core/styles";
import Twitter from './Twitter'
import { thisExpression } from '@babel/types';
import Paper from '@material-ui/core/Paper';

class CreateJob extends Component {
  constructor(props) {
    super(props);


    this.handleChange = this.handleChange.bind(this);
  }
  signal = false;
  state = {
    value: 'twitter',
  };
  handleChange(event) {
    console.log(event.target.value);
    this.setState({
      value: event.target.value
    })
  }

  render() {
    const { classes, className, ...rest } = this.props;
    return (
      <DashboardLayout title="Initialize User" initUser={false}>
        <Paper className={classes.paper}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Please Select Platform</FormLabel>
            <RadioGroup
              row
              aria-label="Please Select Platform"
              name="platform"
              className={classes.group}
              value={this.state.value}
              onChange={this.handleChange}
            >
              <FormControlLabel
                value="twitter"
                control={<Radio color="primary" />}
                label="Twitter"
                labelPlacement="start"
              />
              <FormControlLabel
                value="facebook"
                control={<Radio color="primary" />}
                label="Facebook"
                labelPlacement="start"
              />
              <FormControlLabel
                value="instagram"
                control={<Radio color="primary" />}
                label="Instagram"
                labelPlacement="start"
              />
            </RadioGroup>
          </FormControl>
          {this.state.value === "twitter" ? <Twitter /> : null}
        </Paper>

      </DashboardLayout>
    );
  }
}

CreateJob.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateJob);

