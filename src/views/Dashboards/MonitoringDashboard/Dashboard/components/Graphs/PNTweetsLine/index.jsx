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
import {withRouter} from "react-router-dom";

class PNTweetsLine extends Component {

  handleClick = (data) => {
    const { history } = this.props;
    const url = this.props.match.url;
    history.push(url+'/tweets', {
        type: this.type ,
        tweets: data.dataKey,
        target_type: this.target_type,
        payload: data.payload,
        visual: 'line',
        taskId: this.taskId
    });
  };

  render() {
    const { classes, className,data,type,target_type,taskId, ...rest } = this.props;
      this.type = type;
      this.target_type = target_type;
      this.taskId = taskId;

      console.log('Line graph');
      console.log(data);
    return (
        <ResponsiveContainer             width="100%">
        <LineChart
            width={500}
            height={300}
            className={classes.item}
            data={data}
            margin={{
              top: 10, bottom: 10,
            }}
            cursor="pointer"
        >
          {/*<CartesianGrid strokeDasharray="3 3" />*/}
          <XAxis dataKey="date" interval="preserveStartEnd"/>
          <YAxis label={{ value: 'tweets', angle: -90, position: 'center', textAnchor: 'middle' }}/>
          <Tooltip />
          <Legend  />
          <Line type="temperature"  dataKey="positive" stroke="#45B880"  dot={false}
                activeDot={
                  {
                    onClick: this.handleClick
                  }}
          />
          <Line  type="temperature" dataKey="negative" stroke="#ED4740" dot={false}
                 activeDot={
                   {
                     onClick: this.handleClick
                   }}
          />
          <Line  type="temperature" dataKey="total" stroke="#FFB822"
                 activeDot={
                   {
                     r: 8,
                     onClick: this.handleClick
                   }}
                 dot={false}/>
          <Brush
              height={20}
              dataKey="date"
              stroke="#0767DB"
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

export default compose(
    withRouter,
    withStyles(styles)
)
(PNTweetsLine);

