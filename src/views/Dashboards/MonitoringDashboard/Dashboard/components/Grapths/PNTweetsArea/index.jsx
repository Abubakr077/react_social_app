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
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer, Brush,
} from 'recharts';


// Component styles
import styles from './styles';

// Shared Resources
import compose from "recompose/compose";

class PNTweetsArea extends Component {

  handleClick = (data, index) => {
    console.log('here');
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
        <ResponsiveContainer
            width={1200}
            height={300}
        >
        <AreaChart
            className={classes.item}
            data={data}
            margin={{
              top: 10, right: 30, bottom: 40,
            }}
            cursor="pointer"
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#45B880" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#45B880" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ED4740" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ED4740" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0767DB" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#0767DB" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" interval="preserveStartEnd"/>
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="count_positive" stackId="1" stroke="#45B880"  fillOpacity={1} fill="url(#colorUv)" dot={false}/>
          <Area type="monotone" dataKey="count_negative" stackId="2" stroke="#ED4740"  fillOpacity={1} fill="url(#colorPv)" dot={false}/>
          <Area type="monotone" dataKey="count_date" stackId="3" stroke="#0767DB"  fillOpacity={0.3}  fill="url(#colorTotal)"
                activeDot={
                  {
                    r: 8,
                    onClick: this.handleClick
                  }}
          />
          <Brush
              height={20}
          />
        </AreaChart>
        </ResponsiveContainer>
    );
  }
}


PNTweetsArea.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default
compose(
    withStyles(styles)
)
(PNTweetsArea);

