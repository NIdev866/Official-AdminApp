import React, { Component} from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import validate from './validate'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid'
import { RadioButtonGroup, SelectField } from "redux-form-material-ui"
import MenuItem from 'material-ui/MenuItem'
import { connect } from "react-redux"
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
          name="salaryPerHour"
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
          name="salaryWeekly"
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
          name="salaryMonthly"
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
          name="salaryAnnually"
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



class ParentSalary extends Component{
  constructor(props){
    super(props)
    this.salaryTypeChosen = this.salaryTypeChosen.bind(this)
  }
  salaryTypeChosen(){
    if(this.props.salaryType === "annually"){
      return <AnnuallyChosen/>
    }
    else if(this.props.salaryType === "monthly"){
        return <MonthlyChosen/>
    }
    else if(this.props.salaryType === "weekly"){
      return <WeeklyChosen/>
    }
    else if(this.props.salaryType === "perHour"){
      return <PerHourChosen/>
    }
  }
  render(){
    const { handleSubmit, previousPage } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Row center="xs" style={{height: 360}}>
          <Col xs={10} sm={10} md={3} lg={5}>
            <div style={{marginTop: "30px", marginBottom: "30px"}}>
              <Field name="salaryType" component={SelectField} 
                  selectedMenuItemStyle={{color: "#00BCD4"}} 
                  underlineStyle={{display: "none"}} errorStyle={{display: "none"}} 
                  hintText="Salary type">
                <MenuItem value="annually" primaryText="Annually"/>
                <MenuItem value="monthly" primaryText="Monthly"/>
                <MenuItem value="weekly" primaryText="Weekly"/>
                <MenuItem value="perHour" primaryText="Per Hour"/>
              </Field>
              <Field name="salaryType" component={renderError} />
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
            label="Next"
            primary={true}
            style={styles.raisedButtonStyle}
          />
        </Row>
      </form>
    )
  }
}

ParentSalary = reduxForm({
  form: 'admin',
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(ParentSalary)

const selector = formValueSelector('admin') // <-- same as form name
ParentSalary = connect(
  state => {
    const salaryType = selector(state, 'salaryType')
    return {
      salaryType
    }
  }
)(ParentSalary)

export default ParentSalary
