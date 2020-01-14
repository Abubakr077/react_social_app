import React, {Component} from 'react';
// Externals
import PropTypes from 'prop-types';
// Material helpers
import {withStyles} from '@material-ui/core';
// Component styles
import styles from './styles';
// Shared Resources
import compose from "recompose/compose";
import {Brush, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";
import {withRouter} from "react-router-dom";

class PNTweetsLine extends Component {

  handleClick = (data) => {
    const { history } = this.props;
    const url = this.props.match.url;
      const job = JSON.parse(localStorage.getItem('job'));
      if (job.job_details.platform === 'TWITTER'){
          history.push(url+'/tweets', {
              type: this.type ,
              tweets: data.dataKey,
              target_type: this.target_type,
              payload: data.payload,
              visual: 'line',
              taskId: this.taskId
          });
      } else if (job.job_details.platform === 'YOUTUBE'){
          history.push(url+'/comments', {
              type: this.type ,
              tweets: data.dataKey,
              target_type: this.target_type,
              payload: data.payload,
              visual: 'line',
              taskId: this.taskId
          });
      }
  };

  render() {
    const { classes, className,data,type,target_type,taskId, ...rest } = this.props;
      this.type = type;
      this.target_type = target_type;
      this.taskId = taskId;
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
          <Line type="monotone"  dataKey="positive" stroke="#45B880"  dot={false}
                activeDot={
                  {
                    onClick: this.handleClick
                  }}
          />
          <Line  type="monotone" dataKey="negative" stroke="#ED4740" dot={false}
                 activeDot={
                   {
                     onClick: this.handleClick
                   }}
          />
          <Line  type="monotone" dataKey="total" stroke="#FFB822"
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

