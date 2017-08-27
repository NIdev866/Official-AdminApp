import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid';
import submit from "./submit"
const ageRanges = ['16-23', '24-31', '32-39', '40-47', '48+']

const renderAgeSelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="">Select age range</option>
      {ageRanges.map(val => <option value={val} key={val}>{val}</option>)}
    </select>
  </div>
)

const renderAgeError = ({ input, meta: { touched, error } }) => (
  <div style={{color: "red"}}>
    {touched ? <span>{error}</span> : ""}
  </div>
)

const renderGenderError = ({ input, meta: { touched, error } }) => (
  <div style={{color: "red"}}>
    {touched ? <span>{error}</span> : ""}
  </div>
)

const FormSecondPage = props => {
  const { handleSubmit, previousPage } = props
  return (
    <form onSubmit={handleSubmit}>
      <Row style={{height: 360}}>
      <div>
        <label>Age range</label>
        <Field name="ageRange" component={renderAgeSelector} />
        <Field name="ageRange" component={renderAgeError} />
      </div>
      <Row center="xs">
        <Col xs={12} sm={6} md={3} lg={5}>
          <div style={{marginTop: "40px"}}>
            <label>Gender</label>
            <div style={{marginTop: "5px"}}>
              <label>
                <Field name="gender" component="input" type="radio" value="male" />
                {' '}
                Male
              </label>
              <label>
                <Field name="gender" component="input" type="radio" value="female" />
                {' '}
                Female
              </label>
              <Field name="gender" component={renderGenderError} />
            </div>
          </div>
          <Field
            name="nationality"
            type="text"
            component={renderField}
            label="Nationality"
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
})(FormSecondPage)
