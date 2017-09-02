import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid';
import submit from "./submit"
import countries from "../countries.json"
import { RadioButton } from 'material-ui/RadioButton'
import { RadioButtonGroup, SelectField } from "redux-form-material-ui"
import MenuItem from 'material-ui/MenuItem';

const ageRanges = ['16-23', '24-31', '32-39', '40-47', '48+']

const renderAgeSelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="">Select age range</option>
      {ageRanges.map(val => <option value={val} key={val}>{val}</option>)}
    </select>
  </div>
)

const renderError = ({ input, meta: { touched, error } }) => (
  <div style={{color: "red"}}>
    {touched ? <span>{error}</span> : ""}
  </div>
)

const FormSecondPage = props => {
  const { handleSubmit, previousPage } = props

  const radiosParentDiv = {
    textAlign: "center",
    margin: "0 auto",
    width: "300px",
    marginTop: "30px",
  }
  const genderParentStyle = {
    display: "inline-block",
    width: "300px",
    position: "relative",
  }
  const genderStyle = {
    display: "inline-block",
    width: "45px",
    marginRight: "30px"
  }
  const genderStyle2 = {
    display: "inline-block",
    width: "45px",
    marginLeft: "30px"
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{marginTop: "20px"}}>

          <div style={{marginTop: "30px", marginBottom: "33px"}}>
            <div style={{marginBottom: "-30px"}}>Gender</div>
            <div style={radiosParentDiv}>
              <Field style={genderParentStyle} name="gender" component={RadioButtonGroup}>
                <RadioButton disableTouchRipple style={genderStyle} value="male"/>
                <RadioButton disableTouchRipple style={genderStyle2} value="female"/>
              </Field>
              <div style={{...genderParentStyle, marginLeft: "5px"}}>
                <span style={{marginRight: "65px"}}>Male</span><span>Female</span>
              </div>
              <Field name="gender" component={renderError} />
            </div>
          </div>

        <Field name="ageRange" component={SelectField} 
              selectedMenuItemStyle={{color: "#00BCD4"}} 
              underlineStyle={{display: "none"}} errorStyle={{display: "none"}} 
              hintText="Select your age group">
          <MenuItem value="18-21" primaryText="I'm between 18-21 yrs old"/>
          <MenuItem value="21-29" primaryText="I'm between 21-29 yrs old"/>
          <MenuItem value="30-39" primaryText="I'm between 30-39 yrs old"/>
          <MenuItem value="40-49" primaryText="I'm between 40-49 yrs old"/>
          <MenuItem value="50-59" primaryText="I'm between 50-59 yrs old"/>
        </Field>
        <Field name="ageRange" component={renderError} />
      </div>



        <Field name="nationality" component={SelectField} 
              hintText="Select your nationality" 
              selectedMenuItemStyle={{color: "#00BCD4"}} 
              underlineStyle={{display: "none"}} 
              errorStyle={{display: "none"}}>
          {countries.map(country => <MenuItem value={country.name} primaryText={country.name}/>)}
        </Field>
        <Field name="nationality" component={renderError} />

        <Col xs={12} sm={6} md={3} lg={5} style={{marginTop: "133px"}}>
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
    </form>
  )
}

export default reduxForm({
  form: 'wizard', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(FormSecondPage)













