import React, { Component } from "react"
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import _ from "lodash"
import { connect } from "react-redux"
import jobsDb from "../../jobs.json"

class MapComponent extends Component {
  constructor(props){
    super(props)
    let jobsSelected = this.props.jobsSelectedValues
    let postcodes = []
    for(let i = 0; i < jobsSelected.length; i++){
      for(let j = 0; j < jobsDb.length; j++){
        if(jobsSelected[i] === jobsDb[j].id)
          postcodes.push(jobsDb[j]["work_postalcode"])
      }
    }
    this.state = {
      postcodesArray: postcodes
    }
  }
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
    var node = document.createElement("LI");                 // Create a <li> node
var textnode = document.createTextNode(JSON.stringify(this.state.postcodesArray));         // Create a text node
node.appendChild(textnode);                              // Append the text to <li>
document.getElementById("root").appendChild(node);     // Append <li> to <ul> with id="myList"
    return(
      <GoogleMap
        defaultZoom={this.props.zoom}
        defaultCenter={this.props.center}
        onMarkerClick={_.noop}
        options={{streetViewControl: false, mapTypeControl: false, zoomControl: false}}>
        {mappedMarkers}
        {mappedRoutes}
      </GoogleMap>
    )
  }
}

MapComponent = connect(
  state => {
    if(state.form.wizard.values){
      return{
        jobsSelectedValues: state.form.wizard.values.jobsSelected,
      }
    }
  }
)(MapComponent)

export default withGoogleMap(MapComponent)