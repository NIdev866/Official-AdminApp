/*import React, { Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid'
import { RadioButtonGroup, SelectField } from "redux-form-material-ui"
import MenuItem from 'material-ui/MenuItem'

const renderError = ({ input, meta: { touched, error } }) => (
  <div style={{color: "red"}}>
    {touched ? <span>{error}</span> : ""}
  </div>
)

class FormFirstPage extends Component{
 render(){
  const { handleSubmit, previousPage } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Row center="xs" style={{height: 360}}>
          <Col xs={10} sm={10} md={3} lg={5}>
            <div style={{marginTop: "30px", marginBottom: "30px"}}>
              <Field name="position" component={SelectField} 
                  selectedMenuItemStyle={{color: "#00BCD4"}} 
                  underlineStyle={{display: "none"}} errorStyle={{display: "none"}} 
                  hintText="Position">
                <MenuItem value="Warehouse Operative" primaryText="Warehouse Operative"/>
                <MenuItem value="Cleaner" primaryText="Cleaner"/>
                <MenuItem value="Forklift driver" primaryText="Forklift driver"/>
              </Field>
              <Field name="position" component={renderError} />
            </div>
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

export default reduxForm({
  form: 'admin', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(FormFirstPage)
*/











//NEWEST:

import React, { Component} from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import validate from './validate'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid'
import { RadioButtonGroup, SelectField } from "redux-form-material-ui"
import MenuItem from 'material-ui/MenuItem'
import { fetchNestedJobSectors } from '../../../actions'
import { connect } from 'react-redux'
import submit from "./submit"


const renderError = ({ input, meta: { touched, error } }) => (
  <div style={{color: "red"}}>
    {touched ? <span>{error}</span> : ""}
  </div>
)





class FormFirstPage extends Component{
  constructor(props){
    super(props)
    this.jobSectorChosen = this.jobSectorChosen.bind(this)
    this.renderNestedJobSectors = this.renderNestedJobSectors.bind(this)
    this.jobTitleSelector = this.jobTitleSelector.bind(this)
  }



  jobTitleSelector(){

    let jobTitlesVar = []

    if(this.props.nestedJobSectors){
      this.props.nestedJobSectors.map((nestedJobSector)=>{

        if(nestedJobSector.sector_id == this.props.nested_job_sector_id){
          if(nestedJobSector.job_titles){
            nestedJobSector.job_titles.map((job_title)=>{
              jobTitlesVar.push(job_title)
            })
          }
        }
      })
    }

    return jobTitlesVar.map((job_title)=>{
      return <MenuItem key={job_title.job_title_id} value={job_title.job_title_id} primaryText={job_title.job_title}/>
    })
  }



  jobSectorChosen(){

    if(this.props.nested_job_sector_id){

      let chosenJobSectorHasJobTitles = this.props.nestedJobSectors.filter(el=>el.sector_id === this.props.nested_job_sector_id)[0].job_titles

      if(chosenJobSectorHasJobTitles){

        return( 
          <div>
            <Field name="job_title_list" component={SelectField} 
                selectedMenuItemStyle={{color: "#00BCD4"}} 
                underlineStyle={{display: "none"}} errorStyle={{display: "none"}} 
                hintText="Job Title">
            {this.jobTitleSelector()}
            </Field>   
            <Field name="job_title_list" component={renderError} />
          </div>
        )
      }
    else{
      return <p>No job titles for this sector</p>
    }
    }
  }




  renderNestedJobSectors(){
    if(this.props.nestedJobSectors){
      return this.props.nestedJobSectors.map((nestedJobSector)=>{
        return <MenuItem key={nestedJobSector.sector_id} value={nestedJobSector.sector_id} primaryText={nestedJobSector.sector_title}/>
      })
    }
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
              <Field name="nested_job_sector_id" component={SelectField} 
                  selectedMenuItemStyle={{color: "#00BCD4"}} 
                  underlineStyle={{display: "none"}} errorStyle={{display: "none"}} 
                  hintText="Job Sector">
              {this.renderNestedJobSectors()}
              </Field>    
              <Field name="nested_job_sector_id" component={renderError} />
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
            label="SUBMIT"
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
    nestedJobSectors: state.creating_campaign.nestedJobSectors
  };
}

FormFirstPage = reduxForm({
  form: 'admin', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount,
  onSubmit: submit,
  validate
})(
  connect(mapStateToProps, { fetchNestedJobSectors })(FormFirstPage)
)

const selector = formValueSelector('admin') // <-- same as form name
FormFirstPage = connect(
  state => {
    const nested_job_sector_id = selector(state, 'nested_job_sector_id')
    return {
      nested_job_sector_id
    }
  }
)(FormFirstPage)

export default FormFirstPage