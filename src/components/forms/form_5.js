import React, { Component } from "react"
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Maps from "./Maps"
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Grid, Row, Col } from 'react-flexbox-grid';
import MapsAutocomplete from "./mapsAutocomplete"

import geolib from "geolib" //distance calculator

import workBox from "./workBox"


const google = window.google;


class FormFive extends Component {

  constructor(props){
    super(props)

    this.state = {
      markerOn: false
    }

    /*document.write(geolib.getDistance(
      {latitude: 51.527479, longitude: -0.62388}, 
      {latitude: 51.528743, longitude: -0.620324}
    )) */  //IT WORKS RIGHT. IT IS IN METERS! (TESTED)
  }


  render(){

    const inputStyling = {
      position: "absolute", 
      top: "80", 
      marginLeft: "4"
    }

    const workBoxStyling = {
      position: "absolute", 
      top: "364", 
      marginLeft: "2"
    }

    const { handleSubmit, previousPage } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Row style={{height: 360}}>
          <Field 
            routes={this.props.routes}
            workMarkers={this.props.workMarkers}
            userMarker={this.props.userMarker}
            component={Maps} 
            zoom={8}
            center={{ lat: 51.537452, lng: -0.497681}} //VIEW BOX ONLY
            containerElement={<div style={{height: 100+"%"}} />}
            mapElement={<div style={{height: 100+"%"}} />}
          />
        <div style={inputStyling}>
          <Field 
            userMarker={this.props.userMarker}
            createRoutesAndDuration={this.props.createRoutesAndDuration}
            name="address"
            type="text"
            component={MapsAutocomplete}
            updateMarker={this.props.updateMarker} //CAN DEFFO PASS TO FIELD!!
          />
        </div>

        {this.props.display_work_box && <div style={workBoxStyling}>
                  <Field 
                    routes={this.props.routes}
                    durations={this.props.durations}
                    workMarkers={this.props.workMarkers}
                    zoom={8}
                    userMarker={this.props.userMarker}
                    createRoutesAndDuration={this.props.createRoutesAndDuration}
                    component={workBox}
                    updateMarker={this.props.updateMarker} //CAN DEFFO PASS TO FIELD!!
                  />
                </div>}

      </Row>
      <Row center="xs">
        <Col xs={12} sm={6} md={3} lg={5}>
          <RaisedButton
            type="button"
            label="Prev"
            primary={true}
            onClick={previousPage}
            style={styles.raisedButtonStyle}
          />
          <RaisedButton
            type="submit"
            label="Next"
            primary={true}
            style={styles.raisedButtonStyle}
          />
        </Col>
      </Row>
    </form>
  )}
}

export default reduxForm({
  form: 'wizard', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(FormFive)
