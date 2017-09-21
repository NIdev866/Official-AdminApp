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
import _ from 'lodash'


const renderError = ({ input, meta: { touched, error } }) => (
  <div style={{color: "red"}}>
    {touched ? <span>{error}</span> : ""}
  </div>
)

// const renderSelectField = props => (
//   <SelectField
//     floatingLabelText={props.label}
//     {...props}
//     onChange={(values)=>{
//         this.setState({values})
//       }
      
//     }
//     ></SelectField>
// )
// <Field name='nested_job_sector_title' component={renderSelectField} label='JobSectors'>
//                {this.renderNestedJobSectors()}
//               </Field>  






class FormFirstPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      selectedSectorId: ''
    }
    
    this.renderNestedJobSectors = this.renderNestedJobSectors.bind(this)
    this.renderJobTitlesBySector = this.renderJobTitlesBySector.bind(this)
  }
  componentDidMount(){
    this.props.fetchNestedJobSectors()
  }


  jobTitleSelector(){
    if(this.props.nestedJobSectors){
      this.props.nestedJobSectors.map((nestedJobSector)=>{

        console.log(nestedJobSector)
      //if(nestedJobSector)
      //return <MenuItem value={nestedJobSector.jobTitle} primaryText={nestedJobSector.jobTitle}/>

      })

    }

  }
  renderNestedJobSectors(){
    if(this.props.nestedJobSectors){
      return this.props.nestedJobSectors.map(nestedJobSector=>{
        return <MenuItem key={nestedJobSector.sector_id} 
               value={nestedJobSector.sector_id}
               primaryText={nestedJobSector.sector_title}/>
      })
    }else{
      console.log('failed loading job_sectors')
    }
  }


  renderJobTitlesBySector(id){
    console.log('id from state.selectedSectorId: ' + id)
    if(this.state.selectedSectorId !== ''){

      let selectedSectorsJobTitles = this.props.nestedJobSectors.filter(el=>el.sector_id === id)[0].job_titles

      if(selectedSectorsJobTitles){
        return selectedSectorsJobTitles.map(jobTitle=>{
          return <MenuItem key={jobTitle.job_title_id} 
          value={jobTitle.job_title_id} primaryText={jobTitle.job_title}/>
        })
      }else console.log('selectedSectorsJobTitles object is empty')
    }else{
      console.log('failed loading job_titles by sectors')
    }  
  }

  handleSelection = (event, index, value)=>{

    this.setState({selectedSectorId:index})
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
                  hintText="Job Sector"
                  onChange={this.handleSelection}>
                  {this.renderNestedJobSectors()}
              </Field> 
              
              <Field name="nested_job_sector_title" component={renderError} />

              <Field name="job_titles" component={SelectField} 
                  selectedMenuItemStyle={{color: "#00BCD4"}} 
                  underlineStyle={{display: "none"}} errorStyle={{display: "none"}} 
                  hintText="Job Titles"
                  value={this.state.values}>
                  {this.renderJobTitlesBySector(this.state.selectedSectorId)}
              </Field>    
              
              <Field name="job_titles" component={renderError} />
              
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

function mapStateToProps(state) {
  return {
    nestedJobSectors: state.creating_campaign.nestedJobSectors
  };
}

FormFirstPage = reduxForm({
  form: 'admin', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(
  connect(mapStateToProps, { fetchNestedJobSectors })(FormFirstPage)
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