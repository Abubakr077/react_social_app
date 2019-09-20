import React, { Component } from 'react';
import randomColor from 'randomcolor';
// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';



// Material helpers
import {
    Typography,
    withStyles
} from '@material-ui/core';


// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
    PortletContent
} from 'components';

// Component styles
import styles from './styles';

// Shared Resources
import compose from "recompose/compose";
import ReactWordcloud from 'react-wordcloud';
const options = {
    colors: [randomColor({
        hue: 'blue',
        luminosity: 'dark'
    }),randomColor({
        hue: 'blue'
    }),randomColor({
        hue: 'green',
        luminosity: 'dark'
    }),randomColor({
        hue: 'red',
        luminosity: 'dark'
    })],
    enableTooltip: true,
    deterministic: false,
    fontFamily: 'impact',
    fontSizes: [13, 30],
    fontStyle: 'normal',
    fontWeight: 'normal',
    rotations: 2,
    rotationAngles: [0],
    scale: 'sqrt',
    spiral: 'rectangular',
    transitionDuration: 1000,
};
const options2 = {
    colors: [randomColor({
        hue: 'blue',
        luminosity: 'dark'
    }),randomColor({
        hue: 'blue'
    }),randomColor({
        hue: 'green',
        luminosity: 'dark'
    }),randomColor({
        hue: 'red',
        luminosity: 'dark'
    })],
    enableTooltip: true,
    deterministic: false,
    fontFamily: 'impact',
    fontSizes: [13, 30],
    fontStyle: 'normal',
    fontWeight: 'normal',
    rotations: 2,
    rotationAngles: [0,90],
    scale: 'sqrt',
    spiral: 'rectangular',
    transitionDuration: 1000,
};
class WordClouds extends Component {

  state = {
  };


  render() {
    const { classes, className,cloudOptions, ...rest } = this.props;
    return (

        <Portlet >
            <PortletHeader noDivider>
                <Typography variant="h2">{cloudOptions.title}</Typography>
            </PortletHeader>
            <PortletContent
                noPadding
            >
                {cloudOptions.isWords? (
                    <div className={classes.app_outer}>
                    <div style={{height: 600, width: 1200}}>
                        <ReactWordcloud options={options2} words={cloudOptions.data} />
                    </div>
                </div>
                ): (
                    <div className={classes.app_outer}>
                        <div style={{height: 300, width: 1200}}>
                            <ReactWordcloud options={options} words={cloudOptions.data} />
                        </div>
                    </div>
                )}

            </PortletContent>
        </Portlet>
    );
  }


}


WordClouds.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default
compose(
    withStyles(styles)
)
(WordClouds);

