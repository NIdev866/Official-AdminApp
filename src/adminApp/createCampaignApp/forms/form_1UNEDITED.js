import React, { Component} from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { fetchCompanies } from '../../../actions'
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

  renderCompanies(){
    if(this.props.companies){
      return this.props.companies.map((nestedCompany)=>{
        return <MenuItem key={nestedCompany.company_id} value={nestedCompany.company_id} primaryText={nestedCompany.company_name}/>
      })
    }
  }

  componentWillMount(){
    this.props.fetchCompanies()
  }

  render(){
    const { handleSubmit, previousPage } = this.props
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
    companies: state.creating_campaign.companies
  };
}

FormFirstPage = reduxForm({
  form: 'admin', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(
  connect(mapStateToProps, { fetchCompanies })(FormFirstPage)
)

const selector = formValueSelector('admin') // <-- same as form name
FormFirstPage = connect(
  state => {
    const company_id = selector(state, 'company_id')
    return {
      company_id
    }
  }
)(FormFirstPage)

export default FormFirstPage
