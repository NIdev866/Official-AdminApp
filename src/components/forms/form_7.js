import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Grid, Row, Col } from 'react-flexbox-grid';


const renderRadioError = ({ input, meta: { touched, error } }) => (
  <div style={{color: "red"}}>
    {touched ? <span>{error}</span> : ""}
  </div>
)

const FormSeventhPage = props => {
  const { handleSubmit, previousPage } = props
  return (
    <form onSubmit={handleSubmit}>
      <Row style={{height: 330}}>
        <Row center="xs">
          <Col xs={12} sm={6} md={3} lg={5}>
            <div style={{marginTop: "50px"}}>
              <label>Are you willing to travel to other places?</label>
              <div style={{marginTop: "5px"}}>
                <label>
                  <Field name="willing_to_travel" component="input" type="radio" value="yes" />
                  {' '}
                  Yes
                </label>
                <label>
                  <Field name="willing_to_travel" component="input" type="radio" value="no" />
                  {' '}
                  No
                </label>
                <Field name="willing_to_travel" component={renderRadioError} />
              </div>
            </div>

            <Field
              name="when_can_start"
              type="text"
              component={renderField}
              label="When can you start?"
            />
          </Col>
        </Row>
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
  )
}

export default reduxForm({
  form: 'wizard', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(FormSeventhPage)
