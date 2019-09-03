import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
// import './style.css';
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
    this.props.getLatLong(loca)
    this.setState(prevState => ({
      locations: [location]
    }));
    map.panTo(location);
  };

  render() {
    return (
      <div className="map">
        <Map
          google={this.props.google}
          className="map"
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

export default GoogleApiWrapper({
  apiKey: "AIzaSyDurZQBXjtSzKeieXwtFeGe-jhZu-HEGQU",
  libraries: []
})(MapContainer);