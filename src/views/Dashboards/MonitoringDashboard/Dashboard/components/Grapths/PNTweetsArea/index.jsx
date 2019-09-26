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
  };

  render() {
    const { classes, className,data, ...rest } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (
        <ResponsiveContainer
            width="100%"
        >
        <AreaChart
            className={classes.item}
            width={1200}
            height={300}
            data={data}
            margin={{
              top: 10, right: 30, bottom: 40,
            }}
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
              <stop offset="5%" stopColor="#FFB822" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#FFB822" stopOpacity={0}/>
            </linearGradient>
          </defs>
          {/*<CartesianGrid strokeDasharray="3 3" />*/}
          <XAxis dataKey="date" interval="preserveStartEnd"/>
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="positive" stackId="1" stroke="#45B880"  fillOpacity={1} fill="url(#colorUv)" dot={false}/>
          <Area type="monotone" dataKey="negative" stackId="2" stroke="#ED4740"  fillOpacity={1} fill="url(#colorPv)" dot={false}/>
          <Area type="monotone" dataKey="total" stackId="3" stroke="#FFB822"  fillOpacity={0.3}  fill="url(#colorTotal)"
                activeDot={
                  {
                    r: 8,
                    onClick: this.handleClick
                  }}
          />
          <Brush
              height={20}
              dataKey="date"
              stroke="#0767DB"
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

