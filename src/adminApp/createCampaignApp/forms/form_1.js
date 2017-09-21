import React, { Component} from 'react'
import { Field, reduxForm, formValueSelector, change } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { fetchCompanies, fetchNestedJobSectors } from '../../../actions'
import { RadioButtonGroup, SelectField } from "redux-form-material-ui"
import MenuItem from 'material-ui/MenuItem'
import { Row, Col } from 'react-flexbox-grid'
import { connect } from 'react-redux'

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
    this.getLatAndLngOfCompany = this.getLatAndLngOfCompany.bind(this)
  }

  renderCompanies(){
    if(this.props.companies){
      return this.props.companies.map((nestedCompany)=>{
        return <MenuItem key={nestedCompany.company_id} value={nestedCompany.company_id} primaryText={nestedCompany.company_name}/>
      })
    }
  }
  //funkcja ktora bieze z redux storu, wybrana companies_id i na tej podstawie filter do wyciagniecia lat i lng z tej comapanies i zapisac w redux-form lat,lng



  getLatAndLngOfCompany(){
    if(this.props.company_id){

      let chosenCompanyLat = this.props.companies.filter(el=>el.company_id === this.props.company_id)[0].lat
      let chosenCompanyLng = this.props.companies.filter(el=>el.company_id === this.props.company_id)[0].lng

      this.props.dispatch(change('admin', 'lng', chosenCompanyLng));
      this.props.dispatch(change('admin', 'lat', chosenCompanyLat));
    }
  }


/*job_title_id & employer suck out

Zostac w admin app zrob section ‘activeCampaigns’ 


od 2 punk jest advert I description oba w 2 , w troojce jest cry part time etc I salaries, w 4 quiz questions dummy I w 5 extra space dummy with submit, w 3 submit teraz 

3 fetch employers for dropdown
4 save to redux job_title_id and employer_id on TOP of the form


{
  ‘campaign_name’:’mom jobAdvertTitle’,
  ‘company_id’:’25’
, ‘job_id’:’mom job_title_list’,
  ‘job_description’:’blabal’
  ‘job_type’:’Part-time’.  (Enum - in db has a choice has to be the same)
  ‘salary_type’:’tea enum annually etc’
  ‘salary’:’moo salaryAnually HAS TO BE THE SAME ALL THE TIME’
  ‘lat’:’z db’,
  ‘lng’:’z database’,
  ’job_start_date’:’date picker’, both in page 4
  ‘job_advert_finish_date’:’datepicker’ both in page 4
PAGE 4 IS 2 TIME PICKERS
PAGE 5 IS DUMMY FOR QUIZ
WSZYSTKIE UNDERSCORE
}


DATEPICKER Z MATERIAL_UI NA PEWNO!!!! (albo cos co wyglada ladnie jak dziala z redux-formem.)


job_title_id & employer suck out

Zostac w admin app zrob section ‘activeCampaigns’ 


od 2 punk jest advert I description oba w 2 , w troojce jest cry part time etc I salaries, w 4 quiz questions dummy I w 5 extra space dummy with submit, w 3 submit teraz 

3 fetch employers for dropdown
4 save to redux job_title_id and employer_id on TOP of the form

{
  ‘campaign_name’:’mom jobAdvertTitle’,
  ‘company_id’:’25’
, ‘job_id’:’mom job_title_list’,
  ‘job_description’:’blabal’
  ‘job_type’:’Part-time’.  (Enum - in db has a choice has to be the same)
  ‘salary_type’:’tea enum annually etc’
  ‘salary’:’moo salaryAnually HAS TO BE THE SAME ALL THE TIME’
  ‘lat’:’z db’,
  ‘lng’:’z database’,
  ’job_start_date’:’date picker’, both in page 4
  ‘job_advert_finish_date’:’datepicker’ both in page 4
PAGE 4 IS 2 TIME PICKERS
PAGE 5 IS DUMMY FOR QUIZ
WSZYSTKIE UNDERSCORE
}

FILTER OPTION FOR JOBSEEKER

FILTER OPTION FOR JOBSEEKER*/


  jobSectorChosen(){

    if(this.props.nested_job_sector_id){

  

      //this.props.dispatch(change('admin', 'campaign_name', 'Bob'));





      let chosenJobSectorHasJobTitles = this.props.nestedJobSectors.filter(el=>el.sector_id === this.props.nested_job_sector_id)[0].job_titles
      if(chosenJobSectorHasJobTitles){
        return( 
          <div>
            <Field name="job_id" component={SelectField} 
                selectedMenuItemStyle={{color: "#00BCD4"}} 
                underlineStyle={{display: "none"}} errorStyle={{display: "none"}} 
                hintText="Job Title">
            {this.jobTitleSelector()}
            </Field>   
            <Field name="job_id" component={renderError} />
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

  componentWillMount(){
    this.props.fetchCompanies()
    this.props.fetchNestedJobSectors()
  }

  render(){
    const { handleSubmit, previousPage } = this.props
    if(this.props.company_id){
      this.getLatAndLngOfCompany()
    }
    return (
      <form onSubmit={handleSubmit}>
          <Row center="xs" style={{height: 360}}>
            <Col xs={10} sm={10} md={3} lg={5}>
              <h4 style={{marginTop: "40px", marginBottom: "35px"}}>CREATE A NEW JOB POSTING FOR A COMPANY</h4>
                <Field name="company_id" component={SelectField} 
                    selectedMenuItemStyle={{color: "#00BCD4"}} 
                    underlineStyle={{display: "none"}} errorStyle={{display: "none"}} 
                    hintText="Company Name">
                  {this.renderCompanies()}
                </Field>
                <Field name="company_id" component={renderError} />
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


function mapStateToProps(state) {
  return {
    companies: state.creating_campaign.companies,
    nestedJobSectors: state.creating_campaign.nestedJobSectors
  };
}

FormFirstPage = reduxForm({
  form: 'admin', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(
  connect(mapStateToProps, { fetchCompanies, fetchNestedJobSectors })(FormFirstPage)
)

const selector = formValueSelector('admin') // <-- same as form name
FormFirstPage = connect(
  state => {
    const company_id = selector(state, 'company_id')
    const nested_job_sector_id = selector(state, 'nested_job_sector_id')
    return {
      company_id,
      nested_job_sector_id
    }
  }
)(FormFirstPage)

export default FormFirstPage
