import React, { Component } from "react"
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Maps from "./Maps"
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
//import renderField from './renderField'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Grid, Row, Col } from 'react-flexbox-grid';


import MapsAutocompleteEDITED from "./mapsAutocompleteEDITED"


class FormFive extends Component {

  render(){
    
    const markers = [
      {
        location: {
          lat: 51.54318,
          lng: -0.359016
        }
      }
    ]

    const inputStyling = {
      position: "absolute", 
      top: "80", 
      marginLeft: "4"
    }

    const { handleSubmit, previousPage } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Row style={{height: 360}}>
          <Field 
            markers={markers}
            component={Maps} 
            zoom={8}
            center={{ lat: 51.537452, lng: -0.497681}} //UB6-8UH
            containerElement={<div style={{height: 100+"%"}} />}
            mapElement={<div style={{height: 100+"%"}} />}
          />
          <div style={inputStyling}>
            <Field 
              name="address"
              type="text"
              component={MapsAutocompleteEDITED}
            />
          </div>
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
