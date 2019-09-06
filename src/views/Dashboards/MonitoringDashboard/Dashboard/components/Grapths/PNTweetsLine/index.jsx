import React, { Component } from 'react';

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


// Component styles
import styles from './styles';

// Shared Resources
import compose from "recompose/compose";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

class PNTweetsLine extends Component {

  handleClick = (data, index) => {
    console.log('here');
  };

  render() {
    const { classes, className, ...rest } = this.props;
    const rootClassName = classNames(classes.root, className);
    const data = [
      {
        date: '1-9-2019', positive: 15, negative: 10, total: 25,
      },
      {
        date: '2-9-2019', positive: 5, negative: 24, total: 29,
      },
      {
        date: '3-9-2019', positive: 6, negative: 7, total: 13,
      },
      {
        date: '4-9-2019', positive: 8, negative: 3, total: 11,
      },
      {
        date: '5-9-2019', positive: 19, negative: 10, total: 29,
      },
      {
        date: '6-9-2019', positive: 4, negative: 12, total: 16,
      },
      {
        date: '7-9-2019', positive: 13, negative: 8, total: 21,
      },
    ];

    return (
        <LineChart
            className={classes.item}
            width={900}
            height={300}
            data={data}
            margin={{
              top: 10, right: 20, left: 20, bottom: 10,
            }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' onClick={this.handleClick} dataKey="positive" stroke="#45B880"  />
          <Line type='monotone' dataKey="negative" stroke="#ED4740" />
          <Line type='monotone' dataKey="total" stroke="#0767DB" activeDot={{ r: 8 }} />
        </LineChart>

    );
  }
}


PNTweetsLine.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default
compose(
    withStyles(styles)
)
(PNTweetsLine);

