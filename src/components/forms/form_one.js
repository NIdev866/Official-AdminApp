import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Grid, Row, Col } from 'react-flexbox-grid';

const FormFirstPage = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <Row center="xs">
        <Col xs={10} sm={10} md={3} lg={5}>
          <Field
            name="firstName"
            type="text"
            component={renderField}
            label="First Name"
          />
          <Field
            name="lastName"
            type="text"
            component={renderField}
            label="Last Name"
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

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(FormFirstPage)
