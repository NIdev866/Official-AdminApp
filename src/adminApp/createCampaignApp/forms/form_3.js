import React, { Component} from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import validate from './validate'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid'
import { RadioButtonGroup, SelectField } from "redux-form-material-ui"
import MenuItem from 'material-ui/MenuItem'
import { connect } from 'react-redux'
import submit from "./submit"
import renderField from './renderField'


const renderError = ({ input, meta: { touched, error } }) => (
  <div style={{color: "red"}}>
    {touched ? <span>{error}</span> : ""}
  </div>
)




class PerHourChosen extends Component{
  render(){
    return(
      <span>
      £
        <span style={{display: "inline-block", width: "150px", marginLeft: "5px"}}>
        <Field
          name="salary"
          type="text"
          component={renderField}
          label="Enter salary"
        />
        </span>
        Per Hour
      </span>
    )
  }
}

class WeeklyChosen extends Component{
  render(){
    return(
      <span>
      £
        <span style={{display: "inline-block", width: "150px", marginLeft: "5px"}}>
        <Field
          name="salary"
          type="text"
          component={renderField}
          label="Enter salary"
        />
        </span>
        Per Week
      </span>
    )
  }
}

class MonthlyChosen extends Component{
  render(){
    return(
      <span>
      £
        <span style={{display: "inline-block", width: "150px", marginLeft: "5px"}}>
        <Field
          name="salary"
          type="text"
          component={renderField}
          label="Enter salary"
        />
        </span>
        Per Month
      </span>
    )
  }
}

class AnnuallyChosen extends Component{
  render(){
    return(
      <span>
      £
        <span style={{display: "inline-block", width: "150px", marginLeft: "5px"}}>
        <Field
          name="salary"
          type="text"
          component={renderField}
          label="Enter salary"
        />
        </span>
        Per Year
      </span>
    )
  }
}




class FormFirstPage extends Component{

  constructor(props){
    super(props)
    this.salaryTypeChosen = this.salaryTypeChosen.bind(this)
  }

  salaryTypeChosen(){
    if(this.props.salary_type === "annually"){
      return <AnnuallyChosen/>
    }
    else if(this.props.salary_type === "monthly"){
        return <MonthlyChosen/>
    }
    else if(this.props.salary_type === "weekly"){
      return <WeeklyChosen/>
    }
    else if(this.props.salary_type === "perHour"){
      return <PerHourChosen/>
    }
  }


  render(){
    const { handleSubmit, previousPage } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Row center="xs" style={{height: 360}}>
          <Col xs={10} sm={10} md={3} lg={5}>
            <Field name="job_type" component={SelectField} 
                selectedMenuItemStyle={{color: "#00BCD4"}} 
                underlineStyle={{display: "none"}} errorStyle={{display: "none"}} 
                hintText="Job type">
              <MenuItem value="Full-time" primaryText="Full-time"/>
              <MenuItem value="Part-time" primaryText="Part-time"/>
              <MenuItem value="Temporary" primaryText="Temporary"/>
            </Field>
            <Field name="job_type" component={renderError} />
                        <div style={{marginTop: "30px", marginBottom: "30px"}}>
              <Field name="salary_type" component={SelectField} 
                  selectedMenuItemStyle={{color: "#00BCD4"}} 
                  underlineStyle={{display: "none"}} errorStyle={{display: "none"}} 
                  hintText="Salary type">
                <MenuItem value="annually" primaryText="Annually"/>
                <MenuItem value="monthly" primaryText="Monthly"/>
                <MenuItem value="weekly" primaryText="Weekly"/>
                <MenuItem value="perHour" primaryText="Per Hour"/>
              </Field>
              <Field name="salary_type" component={renderError} />
            </div>
            {this.salaryTypeChosen()}
          </Col>
        </Row>
        <Row center="xs">
          <RaisedButton
            type="button"
            label="Prev"
            primary={true}
            onClick={previousPage}
            style={styles.raisedButtonStyle}
          />
          <RaisedButton
            type="submit"
            label="SUBMIT"
            primary={true}
            style={styles.raisedButtonStyle}
          />
        </Row>
      </form>
    )
  }
}






FormFirstPage = reduxForm({
  form: 'admin',
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  onSubmit: submit,
  validate
})(FormFirstPage)

const selector = formValueSelector('admin') // <-- same as form name
FormFirstPage = connect(
  state => {
    const salary_type = selector(state, 'salary_type')
    return {
      salary_type
    }
  }
)(FormFirstPage)

export default FormFirstPage
