import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Grid, Row, Col } from 'react-flexbox-grid';

import { connect } from "react-redux"
import { registerJobseeker } from "../../actionCreators" 





class FormSecondPage extends Component {



  handleChange(event) {
    console.log('Selected file:', event.target.files[0]);
  }




  onSubmit(values) {
    this.props.registerJobseeker(values)
  }

  render(){
    const { handleSubmit, previousPage } = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div style={{height: 360}}>

          <h4>Upload CV</h4>
          <input name="CV" id="CV" type="file" accept=".doc,.rtf,.wps,.odt,.wpd,.txt,.pdf,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"/>

        </div>
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
              label="Submit"
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
})(
  connect(null, { registerJobseeker })(FormSecondPage)
)