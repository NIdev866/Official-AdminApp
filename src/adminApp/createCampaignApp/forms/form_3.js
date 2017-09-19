import React, { Component} from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import validate from './validate'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid'
import { RadioButtonGroup, SelectField } from "redux-form-material-ui"
import MenuItem from 'material-ui/MenuItem'
import { fetchNestedJobSectors, setStateOfSelectedJobSector, loadJobTitleDropdown } from '../../../actions'
import { connect } from 'react-redux'



import _ from "lodash"




const renderError = ({ input, meta: { touched, error } }) => (
  <div style={{color: "red"}}>
    {touched ? <span>{error}</span> : ""}
  </div>
)



class JobTitleSelector extends Component{
  render(){
    return(
      <div>
        <Field name="job_title_from_db" component={SelectField} 
            selectedMenuItemStyle={{color: "#00BCD4"}} 
            underlineStyle={{display: "none"}} errorStyle={{display: "none"}} 
            hintText="Job Title">

          {this.props.jobTitlesFromMySector && this.props.jobTitlesFromMySector.map((jobTitle)=>{
            return <MenuItem value={jobTitle} primaryText={jobTitle}/>
          })}
        </Field>
        <Field name="job_title_from_db" component={renderError} />
      </div>
    )
  }
}



class FormFirstPage extends Component{
  constructor(props){
    super(props)
    this.jobSectorChosen = this.jobSectorChosen.bind(this)
  }
  jobSectorChosen(){
    if(this.props.nested_job_sector_title){
      this.props.setStateOfSelectedJobSector(this.props.nested_job_sector_title)
      this.props.loadJobTitleDropdown(this.props.nested_job_sector_title)
      return (
        <JobTitleSelector 
  }
  componentWillMount(){
    this.props.fetchNestedJobSectors()
  }
  render(){
    const { handleSubmit, previousPage } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Row center="xs" style={{height: 360}}>
          <Col xs={10} sm={10} md={3} lg={5}>
            <div style={{marginTop: "30px", marginBottom: "30px"}}>
              <Field name="nested_job_sector_title" component={SelectField} 
                  selectedMenuItemStyle={{color: "#00BCD4"}} 
                  underlineStyle={{display: "none"}} errorStyle={{display: "none"}} 
                  hintText="Job Sector">
              {this.props.nestedJobSectors && this.props.nestedJobSectors.jobSectors.map((nestedJobSector)=>{
                return <MenuItem value={nestedJobSector.sector_title} primaryText={nestedJobSector.sector_title}/>
              })


/*              {this.props.nestedJobSectors && this.props.nestedJobSectors.jobSectors.map((nestedJobSector)=>{
                return <MenuItem value={nestedJobSector.sector_title} primaryText={nestedJobSector.sector_title}/>
              })}*/
            }
              </Field>    
              <Field name="nested_job_sector_title" component={renderError} />
            </div>
            {this.jobSectorChosen()}
            <Field name="jobType" component={SelectField} 
                selectedMenuItemStyle={{color: "#00BCD4"}} 
                underlineStyle={{display: "none"}} errorStyle={{display: "none"}} 
                hintText="Job type">
              <MenuItem value="Full-time" primaryText="Full-time"/>
              <MenuItem value="Part-time" primaryText="Part-time"/>
              <MenuItem value="Temporary" primaryText="Temporary"/>
            </Field>
            <Field name="jobType" component={renderError} />
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

function mapStateToProps(state) {
  return {
    nestedJobSectors: state.creating_campaign.nestedJobSectors,
    selectedJobSector: state.creating_campaign.selectedJobSector,
    jobTitlesFromMySector: state.creating_campaign.jobTitlesFromMySector
  };
}

FormFirstPage = reduxForm({
  form: 'admin', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(
  connect(mapStateToProps, { fetchNestedJobSectors, setStateOfSelectedJobSector, loadJobTitleDropdown })(FormFirstPage)
)

const selector = formValueSelector('admin') // <-- same as form name
FormFirstPage = connect(
  state => {
    const nested_job_sector_title = selector(state, 'nested_job_sector_title')
    return {
      nested_job_sector_title
    }
  }
)(FormFirstPage)

export default FormFirstPage