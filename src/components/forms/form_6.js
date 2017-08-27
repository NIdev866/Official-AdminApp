import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid'

const renderRadioError = ({ input, meta: { touched, error } }) => (
  <div style={{color: "red"}}>
    {touched ? <span>{error}</span> : ""}
  </div>
)

const FormSixthPage = props => {
  const { handleSubmit, previousPage } = props
  return (
    <form onSubmit={handleSubmit}>
      <Row style={{height: 330}}>
        <Row center="xs">
          <Col xs={12} sm={6} md={3} lg={5}>
            <div style={{marginTop: "50px"}}>
              <label>Are you currently a student?</label>
              <div style={{marginTop: "5px"}}>
                <label>
                  <Field name="student" component="input" type="radio" value="yes" />
                  {' '}
                  Yes
                </label>
                <label>
                  <Field name="student" component="input" type="radio" value="no" />
                  {' '}
                  No
                </label>
                <Field name="student" component={renderRadioError} />
              </div>
            </div>
            <div style={{marginTop: "50px"}}>
              <label>Is this your first job in the UK?</label>
              <div style={{marginTop: "5px"}}>
                <label>
                  <Field name="first_work_in_uk" component="input" type="radio" value="yes" />
                  {' '}
                  Yes
                </label>
                <label>
                  <Field name="first_work_in_uk" component="input" type="radio" value="no" />
                  {' '}
                  No
                </label>
                <Field name="first_work_in_uk" component={renderRadioError} />
              </div>
            </div>
            <div style={{marginTop: "50px"}}>
              <label>Are you currently self employed?</label>
              <div style={{marginTop: "5px"}}>
                <label>
                  <Field name="self_employed" component="input" type="radio" value="yes" />
                  {' '}
                  Yes
                </label>
                <label>
                  <Field name="self_employed" component="input" type="radio" value="no" />
                  {' '}
                  No
                </label>
                <Field name="self_employed" component={renderRadioError} />
              </div>
            </div>
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
})(FormSixthPage)
