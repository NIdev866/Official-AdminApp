import React, { Component } from "react"
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import _ from "lodash";

import geolib from "geolib" //distance calculator (straight line in meters though)


class Map extends Component {

  render(){
    const allMarkers = [
      ...this.props.workMarkers, //this.props.userMarker
    ]
    let mappedMarkers = []
    if(!this.props.directions){

/*
                    var node = document.createElement("LI");                 // Create a <li> node
                    var textnode = document.createTextNode("this.props.directions");         // Create a text node
                    node.appendChild(textnode);                              // Append the text to <li>
                    document.getElementById("root").appendChild(node);     // Append <li> to <ul> with id="myList"
*/


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











    //NOW "directions" PROP IS AN ARRAY! HAVE TO MAP THROUGH IT!


    //IN ONE "render()" YOU CAN HAVE MULTIPLE RETURNS

    let mappedDirections = []

    if(this.props.directions === {} || this.props.directions){
/*

                    var node = document.createElement("LI");                 // Create a <li> node
                    var textnode = document.createTextNode(JSON.stringify(this.props.directions));         // Create a text node
                    node.appendChild(textnode);                              // Append the text to <li>
                    document.getElementById("root").appendChild(node);     // Append <li> to <ul> with id="myList"*/



        mappedDirections = this.props.directions.map((venue, i) => {
    
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
        options={{streetViewControl: false, mapTypeControl: false,}}>
        {mappedMarkers}
        {mappedDirections}
      </GoogleMap>
    )
  }
}

export default withGoogleMap(Map)