import React, { Component } from "react";
import compose from 'recompose/compose';
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import PropTypes from 'prop-types';
import {
  withStyles
} from '@material-ui/core';

const MarkersList = props => {
  const { locations, ...markerProps } = props;
  return (
    <span>
      {locations.map((location, i) => {
        return (
          <Marker
            key={i}
            {...markerProps}
            position={{ lat: location.lat(), lng: location.lng() }}
          />
        );
      })}
    </span>
  );
};
const styles = theme => ({
  map: {
      height:"400px",
      position: "relative",
      // border:"1px solid blue"
    }  
});

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: []
    };
    this.handleMapClick = this.handleMapClick.bind(this);
  }
   
  handleMapClick = (ref, map, ev) => {
    const location = ev.latLng;
    console.log(location.lat());
    const loca = location.lat()+"%2C"+location.lng();
    console.log(loca);
    this.props.getLatLong(loca);
    this.setState(prevState => ({
      locations: [location]
    }));
    map.panTo(location);
  };

  render() {
    const { classes, className } = this.props;
    return (
      <div className={classes.map}>
        <Map
          google={this.props.google}
          zoom={this.props.zoom}
          initialCenter={this.props.center}
          onClick={this.handleMapClick}
        >
         <MarkersList locations={this.state.locations} icon="images\logos\pin2.gif" />
        </Map>
      </div>
    );
  }
}
GoogleApiWrapper.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  GoogleApiWrapper({
    apiKey: "AIzaSyDurZQBXjtSzKeieXwtFeGe-jhZu-HEGQU",
    // apiKey: "AIzaSyBNBrWGhiL26l5t76_vdLlTf-Y1ReGC3Oo",
    // apiKey: "AIzaSyAEnVkzBPbqjkjC3Cpjj_wT0T_RAgyd61w",
    // apiKey: "AIzaSyDA1GLJp4PZVXqFgRgpQQQI3ZdSMb116Fw",
    // apiKey: "AIzaSyCoEGO5VKwaxykazt0z9kfrqrfXpwLJP6A",
    libraries: []
  })
)(MapContainer);