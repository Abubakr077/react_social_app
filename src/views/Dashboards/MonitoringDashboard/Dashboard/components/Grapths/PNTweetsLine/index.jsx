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
import {
  CartesianGrid,
  Legend,
  Line,
  Brush,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart
} from "recharts";

class PNTweetsLine extends Component {

  handleClick = (data) => {
    console.log('here');
    console.log(data);
  };

  render() {
    const { classes, className, ...rest } = this.props;
    const rootClassName = classNames(classes.root, className);
    const data = [
      {
        "date": "2019-04-14",
        "count_date": 1,
        "count_positive": 1,
        "count_negative": 0
      },
      {
        "date": "2019-04-15",
        "count_date": 3,
        "count_positive": 1,
        "count_negative": 2
      },
      {
        "date": "2019-04-16",
        "count_date": 2,
        "count_positive": 2,
        "count_negative": 0
      },
      {
        "date": "2019-04-17",
        "count_date": 2,
        "count_positive": 1,
        "count_negative": 1
      },
      {
        "date": "2019-04-19",
        "count_date": 4,
        "count_positive": 4,
        "count_negative": 0
      },
      {
        "date": "2019-04-21",
        "count_date": 1,
        "count_positive": 1,
        "count_negative": 0
      },
      {
        "date": "2019-04-23",
        "count_date": 3,
        "count_positive": 3,
        "count_negative": 0
      },
      {
        "date": "2019-04-24",
        "count_date": 2,
        "count_positive": 2,
        "count_negative": 0
      },
      {
        "date": "2019-04-25",
        "count_date": 1,
        "count_positive": 0,
        "count_negative": 1
      },
      {
        "date": "2019-04-26",
        "count_date": 4,
        "count_positive": 4,
        "count_negative": 0
      },
      {
        "date": "2019-04-27",
        "count_date": 1,
        "count_positive": 1,
        "count_negative": 0
      },
      {
        "date": "2019-04-28",
        "count_date": 2,
        "count_positive": 1,
        "count_negative": 1
      },
      {
        "date": "2019-04-29",
        "count_date": 1,
        "count_positive": 1,
        "count_negative": 0
      },
      {
        "date": "2019-04-30",
        "count_date": 9,
        "count_positive": 8,
        "count_negative": 1
      },
      {
        "date": "2019-05-01",
        "count_date": 3,
        "count_positive": 2,
        "count_negative": 1
      },
      {
        "date": "2019-05-02",
        "count_date": 1,
        "count_positive": 1,
        "count_negative": 0
      },
      {
        "date": "2019-05-03",
        "count_date": 2,
        "count_positive": 2,
        "count_negative": 0
      },
      {
        "date": "2019-05-04",
        "count_date": 1,
        "count_positive": 1,
        "count_negative": 0
      },
      {
        "date": "2019-05-05",
        "count_date": 1,
        "count_positive": 0,
        "count_negative": 1
      },
      {
        "date": "2019-05-06",
        "count_date": 2,
        "count_positive": 2,
        "count_negative": 0
      },
      {
        "date": "2019-05-08",
        "count_date": 1,
        "count_positive": 1,
        "count_negative": 0
      },
      {
        "date": "2019-05-10",
        "count_date": 5,
        "count_positive": 4,
        "count_negative": 1
      },
      {
        "date": "2019-05-11",
        "count_date": 4,
        "count_positive": 3,
        "count_negative": 1
      },
      {
        "date": "2019-05-13",
        "count_date": 1,
        "count_positive": 1,
        "count_negative": 0
      },
      {
        "date": "2019-05-15",
        "count_date": 1,
        "count_positive": 1,
        "count_negative": 0
      },
      {
        "date": "2019-05-17",
        "count_date": 1,
        "count_positive": 1,
        "count_negative": 0
      },
      {
        "date": "2019-05-18",
        "count_date": 1,
        "count_positive": 1,
        "count_negative": 0
      },
      {
        "date": "2019-05-19",
        "count_date": 2,
        "count_positive": 2,
        "count_negative": 0
      },
      {
        "date": "2019-05-20",
        "count_date": 3,
        "count_positive": 3,
        "count_negative": 0
      },
      {
        "date": "2019-05-21",
        "count_date": 5,
        "count_positive": 5,
        "count_negative": 0
      },
      {
        "date": "2019-05-22",
        "count_date": 3,
        "count_positive": 2,
        "count_negative": 1
      },
      {
        "date": "2019-05-23",
        "count_date": 16,
        "count_positive": 14,
        "count_negative": 2
      },
      {
        "date": "2019-05-24",
        "count_date": 2,
        "count_positive": 1,
        "count_negative": 1
      },
      {
        "date": "2019-05-25",
        "count_date": 5,
        "count_positive": 5,
        "count_negative": 0
      },
      {
        "date": "2019-05-26",
        "count_date": 1,
        "count_positive": 1,
        "count_negative": 0
      },
      {
        "date": "2019-08-10",
        "count_date": 1,
        "count_positive": 1,
        "count_negative": 0
      },
      {
        "date": "2019-08-12",
        "count_date": 2,
        "count_positive": 2,
        "count_negative": 0
      }
    ];

    return (
        <ResponsiveContainer             width={800}
                                         height={300}>
        <LineChart
            className={classes.item}
            data={data}
            margin={{
              top: 10, bottom: 10,
            }}
            cursor="pointer"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" interval="preserveStartEnd"/>
          <YAxis label={{ value: 'tweets', angle: -90, position: 'center', textAnchor: 'middle' }}/>
          <Tooltip />
          <Legend  />
          <Line type="natural"  dataKey="count_positive" stroke="#45B880"  dot={false}
                activeDot={
                  {
                    onClick: this.handleClick
                  }}
          />
          <Line  type="natural" dataKey="count_negative" stroke="#ED4740" dot={false}
                 activeDot={
                   {
                     onClick: this.handleClick
                   }}
          />
          <Line  type="natural" dataKey="count_date" stroke="#0767DB"
                 activeDot={
                   {
                     r: 8,
                     onClick: this.handleClick
                   }}
                 dot={false}/>
          <Brush
              height={20}
          />
        </LineChart>
        </ResponsiveContainer>

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

