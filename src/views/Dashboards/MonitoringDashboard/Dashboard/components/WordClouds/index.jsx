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
    colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
    enableTooltip: true,
    deterministic: false,
    fontFamily: 'impact',
    fontSizes: [10, 30],
    fontStyle: 'normal',
    fontWeight: 'normal',
    rotations: 2,
    rotationAngles: [0],
    scale: 'sqrt',
    spiral: 'rectangular',
    transitionDuration: 1000,
};

class WordClouds extends Component {

  state = {
  };


  render() {
    const { classes, className, ...rest } = this.props;
    const data = [
        {
            "text": "bbc_news_Urdu",
            "value": 19
        },
        {
            "text": "elements_making_mockery",
            "value": 19
        },
        {
            "text": "special_committee_assures",
            "value": 18
        },
        {
            "text": "senate_special_committee",
            "value": 18
        },
        {
            "text": "islamabad_press_club",
            "value": 18
        },
        {
            "text": "assassinations_waziristan_mark",
            "value": 18
        },
        {
            "text": "General_Chat_Chat",
            "value": 18
        },
        {
            "text": "Chat_Chat_Lounge",
            "value": 18
        },
        {
            "text": "waziristan_mark_taliban",
            "value": 17
        },
        {
            "text": "assures_ptm_addressing",
            "value": 17
        },
        {
            "text": "seats_erstwhile_fata",
            "value": 17
        },
        {
            "text": "committee_assures_ptm",
            "value": 16
        },
        {
            "text": "seats_increase_fata",
            "value": 16
        },
        {
            "text": "bbc_news_Urdu1",
            "value": 20
        },
        {
            "text": "elements_making_mockery1",
            "value": 19
        },
        {
            "text": "special_committee_assures1",
            "value": 18
        },
        {
            "text": "senate_special_committee1",
            "value": 18
        },
        {
            "text": "islamabad_press_club1",
            "value": 18
        },
        {
            "text": "assassinations_waziristan_mark1",
            "value": 18
        },
        {
            "text": "General_Chat_Chat1",
            "value": 18
        },
        {
            "text": "Chat_Chat_Lounge1",
            "value": 18
        },
        {
            "text": "waziristan_mark_taliban1",
            "value": 17
        },
        {
            "text": "assures_ptm_addressing1",
            "value": 17
        },
        {
            "text": "seats_erstwhile_fata1",
            "value": 17
        },
        {
            "text": "committee_assures_ptm1",
            "value": 16
        },
        {
            "text": "seats_increase_fata1",
            "value": 16
        }
    ];
    data.map((item)=>{
        console.log(item.word);
        console.log(item.freq);
    });
    return (

        <Portlet >
            <PortletHeader noDivider>
                <Typography variant="h2">Associations Cloud</Typography>
            </PortletHeader>
            <PortletContent
                noPadding
            >
                <div className={classes.app_outer}>
                    <div style={{height: 600, width: 1200}}>
                        <ReactWordcloud options={options} words={data} />
                    </div>
                </div>
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

