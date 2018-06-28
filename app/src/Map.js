import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

class Map extends Component {
  constructor(prop) {
    super(prop)
    this.state = { places: [] }
  }
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      this.setState({ position: coords }, () => {
        const { latitude, longitude } = coords;
        fetch(`/json?lat=${latitude}&long=${longitude}`)
        .then(resp => resp.json())
        .then(places => this.setState({ ...this.state, places }));
      })
    })
  }
  render() {
    if (this.state.position === undefined) {
      return <div>loading</div>
    }
    const markers = this.state.places.map(({ result }) => {
      const { geometry: { location = {} } = {}, name } = result;
      return <Marker position={location} label={name}/>
    })
    return (
      <GoogleMap
      defaultZoom={8}
      defaultCenter={{lat: this.state.position.latitude, lng: this.state.position.longitude }}
      >
        {markers}
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(Map));
