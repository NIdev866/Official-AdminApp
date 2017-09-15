import React, { Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid'

class FormFirstPage extends Component{
 render(){
  const { handleSubmit, previousPage } = this.props
    return (
      <form onSubmit={handleSubmit}>
          <Row center="xs" style={{height: 360}}>
            <Col xs={10} sm={10} md={3} lg={5}>
              <h2 style={{marginTop: "40px", marginBottom: "35px"}}>CREATE A NEW JOB POSTING</h2>
                <Field
                  name="jobTitle"
                  type="text"
                  component={renderField}
                  label="Job Title"
                />
            </Col>
          </Row>
        <Row center="xs">
          <RaisedButton
            type="submit"
            label="Next"
            primary={true}
            style={styles.raisedButtonStyle}
          />
        </Row>
      </form>
    )
  }
}

export default reduxForm({
  form: 'admin', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(FormFirstPage)
