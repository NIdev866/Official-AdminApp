import React, { Component } from "react"
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import _ from "lodash";

class Map extends Component {

  render(){
    const allMarkers = this.props.markers || []

    const markers = allMarkers.map((venue, i) => {

      const marker = {
        position: {
          lat: venue.location.lat,
          lng: venue.location.lng
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
        options={{streetViewControl: false}}>
        {markers}
      </GoogleMap>
    )
  }
}


export default withGoogleMap(Map)