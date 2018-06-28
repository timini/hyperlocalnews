import React, { Component } from 'react';
import logo from './logo.svg';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import './App.css';
import Map from './Map'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `800px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default App;
