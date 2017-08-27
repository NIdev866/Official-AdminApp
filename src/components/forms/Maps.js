import React, { Component } from "react"
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import _ from "lodash"

class Map extends Component {
  render(){
    const allMarkers = [
      ...this.props.workMarkers,
    ]
    let mappedMarkers = []
    if(!this.props.routes){
      mappedMarkers = allMarkers.map((venue, i) => {
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
    }
    let mappedRoutes = []
    if(this.props.routes === {} || this.props.routes){
      mappedRoutes = this.props.routes.map((venue, i) => {
        return (
          <DirectionsRenderer directions={venue} />
        )
      })
    }
    return(
      <GoogleMap
        defaultZoom={this.props.zoom}
        defaultCenter={this.props.center}
        onMarkerClick={_.noop}
        options={{streetViewControl: false, mapTypeControl: false}}>
        {mappedMarkers}
        {mappedRoutes}
      </GoogleMap>
    )
  }
}

export default withGoogleMap(Map)