import React, {Component} from 'react';
// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
// Material helpers
import {withStyles} from '@material-ui/core';
// Component styles
import styles from './styles';
// Shared Resources
import compose from "recompose/compose";
import {Cell, Pie, PieChart, ResponsiveContainer, Sector} from "recharts";
import {withRouter} from "react-router-dom";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
      <g>
        <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
            // cursor="pointer"
        />
        <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerRadius + 6}
            outerRadius={outerRadius + 10}
            fill={fill}
        />
        <path  d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle  cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload.name}`}</text>
        {/*<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">*/}
        {/*  {`(Rate ${(percent * 100).toFixed(2)}%)`}*/}
        {/*</text>*/}
      </g>
  );
};

class PNTweetsPie extends Component {

  state = {
    activeIndex: 0,
  };
  type = null;
  target_type = null;
  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };
    handleClick = (data) => {
        console.log(data);
        // const { history } = this.props;
        // const url = this.props.match.url;
        // history.push(url+'/tweets', {
        //     type: this.type ,
        //     tweets: data.name ,
        //     target_type: this.target_type,
        //     payload:data.payload,
        //     visual: 'pie'
        // });
    };
  render() {
    const { classes, className,data,type,target_type, ...rest } = this.props;
    const rootClassName = classNames(classes.root, className);
    this.type = type;
    this.target_type = target_type;
    const data1 = data.map((item)=>(Object.assign({}, item, {"value":Number(item.value)})));

    const COLORS = [ '#45B880', '#ED4740'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
                                     cx, cy, midAngle, innerRadius, outerRadius, percent
                                   }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
          <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
          </text>
      );
    };

    return (
        <ResponsiveContainer
            width="100%"
        >
        <PieChart
            className={rootClassName}
            width={400} height={250}
        >
          <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}
              data={data1}
              labelLine={false}
              label={renderCustomizedLabel}
              onClick={this.handleClick}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={this.onPieEnter}
          >
            {
              data1.map((entry, index) => <Cell  key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
        </PieChart>
        </ResponsiveContainer>


    );
  }
}
PNTweetsPie.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
export default compose(
    withRouter,
    withStyles(styles)
)(PNTweetsPie);