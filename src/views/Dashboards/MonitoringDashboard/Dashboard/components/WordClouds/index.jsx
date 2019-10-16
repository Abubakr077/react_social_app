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
import {withRouter} from "react-router-dom";
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
    fontSizes: [20, 50],
    fontStyle: 'normal',
    fontWeight: 'normal',
    rotations: 2,
    rotationAngles: [0],
    scale: 'sqrt',
    spiral: 'rectangular',
    transitionDuration: 1000,
};

function getCallback(callback,props,cloudOptions) {
    return function (word, event) {
        const isActive = callback !== 'onWordMouseOut';
        const element = event.target;
        const text = select(element);
        text
            .on('click', () => {
                if (isActive) {
                    const { history } = props;
                    const url = props.match.url;
                    history.push(url+'/tweets', {
                        type: cloudOptions.type ,
                        tweets: word.text,
                        target_type: cloudOptions.target_type,
                        visual: 'assoc',
                        taskId: cloudOptions.taskId
                    });
                }
            })
            .transition()
            .attr('font-size', isActive ? '130%' : '100%')
    }
    }

    class WordClouds extends Component {

        state = {};
        type=null;
        target_type = null;

        render() {
            const {classes, className, cloudOptions, ...rest} = this.props;
            console.log('cloud');
            console.log(cloudOptions);


            this.callbacks = {
                onWordClick: getCallback('onWordClick',this.props,cloudOptions),
                onWordMouseOut: getCallback('onWordMouseOut',this.props,cloudOptions),
                onWordMouseOver: getCallback('onWordMouseOver',this.props,cloudOptions),
            };
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
                                <div style={{height: 600, width: "100%"}}>
                                    <ReactWordcloud
                                        options={options2}
                                        words={cloudOptions.data}
                                        callbacks={this.callbacks}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className={classes.app_outer}>
                                <div style={{height: 300, width: "100%"}}>
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
    withRouter,
    withStyles(styles)
)
    (WordClouds);

