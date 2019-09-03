import React, { Component } from 'react';
import randomColor from 'randomcolor';
import TagCloud from 'react-tag-cloud';
import CloudItem from './CloudItem';
// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style.css';


// Material helpers
import {
  withStyles
} from '@material-ui/core';


// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel
} from 'components';

// Component styles
import styles from './styles';

// Shared Resources
import compose from "recompose/compose";


class WordClouds extends Component {

  state = {
  };

  render() {
    const { classes, className, ...rest } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (

        <div>
        <h1> Tags Cloud </h1>
        <div className={classes.app_outer}>
            <TagCloud
                style={{
                  fontFamily: 'sans-serif',
                  fontSize: () => Math.round(Math.random() * 15) + 16,
                  // fontSize: 30,
                  color: () => randomColor({
                    hue: 'blue'
                  }),
                  padding: 5,
                    flex: 1,
                }}>
              <div
                  style={{
                    fontFamily: 'serif',
                    fontSize: 40,
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    color: randomColor()
                  }}>Futurama</div>
              <CloudItem text="Custom item, Hover me!" />
              <CloudItem text="Custom item 2, Hover me!" />
              <div rotate={Math.random()} className={classes.large}>Transformers</div>
              <div rotate={Math.random()}  className={classes.large}>Simpsons</div>
              <div rotate={Math.random()}  className={classes.large}>Dragon Ball</div>
              <div rotate={Math.random()}  className={classes.large}>Rick & Morty</div>
              <div rotate={Math.random()}  style={{fontFamily: 'courier'}}>He man</div>
              <div rotate={Math.random()}  style={{fontSize: 30}}>World trigger</div>
              <div rotate={Math.random()}  style={{fontStyle: 'italic'}}>Avengers</div>
              <div rotate={Math.random()}  style={{fontWeight: 200}}>Family Guy</div>
              <div rotate={Math.random()}  style={{color: 'green'}}>American Dad</div>
              <div rotate={Math.random()}  className="tag-item-wrapper">
                <div>
                  Hover Me Please!
                </div>
                <div className="tag-item-tooltip">
                  HOVERED!
                </div>
              </div>
              <div>Gobots</div>
              <div>Thundercats</div>
              <div>M.A.S.K.</div>
              <div>GI Joe</div>
              <div>Inspector Gadget</div>
              <div>Bugs Bunny</div>
              <div>Tom & Jerry</div>
              <div>Cowboy Bebop</div>
              <div>Evangelion</div>
              <div>Bleach</div>
              <div>GITS</div>
              <div>Pokemon</div>
              <div>She Ra</div>
              <div>Fullmetal Alchemist</div>
              <div>Gundam</div>
              <div>Uni Taisen</div>
              <div>Pinky and the Brain</div>
              <div>Bobs Burgers</div>
              <div className={classes.small}>Dino Riders</div>
              <div className={classes.small}>Silverhawks</div>
              <div className={classes.small}>Bravestar</div>
              <div className={classes.small}>Starcom</div>
              <div className={classes.small}>Cops</div>
              <div className={classes.small}>Alfred J. Kwak</div>
              <div className={classes.small}>Dr Snuggles</div>
            </TagCloud>
        </div>
        </div>
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

