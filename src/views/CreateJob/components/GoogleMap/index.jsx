import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
class MainMap extends Component {
    constructor(props) {
      super(props);
      this.state = {
        markers: [
          {
            title: "Islamabad",
            name: "Islamabad",
            position: { lat: 33.6844, lng: 73.0479 }
          }
        ]
      };
      this.onClick = this.onClick.bind(this);
    }
  
    onClick(t, map, coord) {
      const { latLng } = coord;
      const lat = latLng.lat();
      const lng = latLng.lng();
  
      this.setState(previousState => {
        return {
          markers: [
            ...previousState.markers,
            {
              title: "",
              name: "",
              position: { lat, lng }
            }
          ]
        };
      });
    }
  
    render() {
      return (
        <div style={{height:"300px"}} >
          <h1 className="text-center">My Maps</h1>
          <Map
            google={this.props.google}
            style={{height:"280px", width: "37%" }}
            className={"map"}
            zoom={14}
            onClick={this.onClick}
          >
            {this.state.markers.map((marker, index) => (
              <Marker
                key={index}
                title={marker.title}
                name={marker.name}
                position={marker.position}
              />
            ))}
          </Map>
        </div>
      );
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: ('AIzaSyCU58dA4Z3sTCYJ2KDo0hBq8mI5_I5Dmjs')
  })(MainMap);