import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class MapComponent extends Component {
  static defaultProps = {
    center: {
      lat: 53.143570,
      lng: 18.131288
    },
    zoom: 18
  };
 
  render() {
    return (
      <div style={{ height: '60vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBtXQZoX7K7Qsui2NdoNSdL8tNYLzwx-lQ'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={53.143570}
            lng={18.131288}
            text="Tu jesteśmy!"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default MapComponent;