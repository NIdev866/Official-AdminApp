import React, { Component } from "react"
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import _ from "lodash";

import geolib from "geolib" //distance calculator (straight line in meters though)


class Map extends Component {

  render(){

    const allMarkers = [
      ...this.props.workMarkers, //this.props.userMarker
    ]

    const mappedMarkers = allMarkers.map((venue, i) => {
      const marker = {
        position: {
          lat: venue.position.lat,
          lng: venue.position.lng
        }
      }
      return (
        <Marker 
          key={i} 
          {...marker} 
        />
      )
    })
    return(
      <GoogleMap
        defaultZoom={this.props.zoom}
        defaultCenter={this.props.center}
        onMarkerClick={_.noop}
        options={{streetViewControl: false, mapTypeControl: false,}}>
        {mappedMarkers}
        {this.props.directions && <DirectionsRenderer directions={this.props.directions} />}
      </GoogleMap>
    )
  }
}

export default withGoogleMap(Map)