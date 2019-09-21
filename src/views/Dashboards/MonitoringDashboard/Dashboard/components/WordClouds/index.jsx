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
import {select} from "d3-selection";
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
    enableTooltip: false,
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
    enableTooltip: false,
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

function getCallback(callback) {
    return function (word, event) {
        const isActive = callback !== 'onWordMouseOut';
        const element = event.target;
        const text = select(element);
        text
            .on('click', () => {
                if (isActive) {
                    window.open(`https://duckduckgo.com/?q=${word.text}`, '_blank')
                }
            })
            .transition()
            .attr('background', 'white')
            .attr('font-size', isActive ? '300%' : '100%')
            .attr('text-decoration', isActive ? 'underline' : 'none')
    }
    };

    class WordClouds extends Component {

        state = {};
        callbacks = {
            onWordClick: getCallback('onWordClick'),
            onWordMouseOut: getCallback('onWordMouseOut'),
            onWordMouseOver: getCallback('onWordMouseOver'),
        };

        render() {
            const {classes, className, cloudOptions, ...rest} = this.props;


            return (

                <Portlet>
                    <PortletHeader noDivider>
                        <Typography variant="h2">{cloudOptions.title}</Typography>
                    </PortletHeader>
                    <PortletContent
                        noPadding
                    >
                        {cloudOptions.isWords ? (
                            <div className={classes.app_outer}>
                                <div style={{height: 600, width: 1200}}>
                                    <ReactWordcloud
                                        options={options2}
                                        words={cloudOptions.data}
                                        callbacks={this.callbacks}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className={classes.app_outer}>
                                <div style={{height: 300, width: 1200}}>
                                    <ReactWordcloud
                                        options={options}
                                        words={cloudOptions.data}
                                        callbacks={this.callbacks}
                                    />
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

    export default compose(
        withStyles(styles)
    )
    (WordClouds);

