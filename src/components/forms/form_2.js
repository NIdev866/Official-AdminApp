import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid';
import submit from "./submit"
import { RadioButton } from 'material-ui/RadioButton'
import { RadioButtonGroup, SelectField } from "redux-form-material-ui"
import MenuItem from 'material-ui/MenuItem'
import CircularProgress from 'material-ui/CircularProgress'

const countries = [
{"name": "Afghanistan"},
{"name": "Åland Islands"},
{"name": "Albania"},
{"name": "Algeria"},
{"name": "American Samoa"},
{"name": "AndorrA"},
{"name": "Angola"},
{"name": "Anguilla"},
{"name": "Antarctica"},
{"name": "Antigua and Barbuda"},
{"name": "Argentina"},
{"name": "Armenia"},
{"name": "Aruba"},
{"name": "Australia"},
{"name": "Austria"},
{"name": "Azerbaijan"},
{"name": "Bahamas"},
{"name": "Bahrain"},
{"name": "Bangladesh"},
{"name": "Barbados"},
{"name": "Belarus"},
{"name": "Belgium"},
{"name": "Belize"},
{"name": "Benin"},
{"name": "Bermuda"},
{"name": "Bhutan"},
{"name": "Bolivia"},
{"name": "Bosnia and Herzegovina"},
{"name": "Botswana"},
{"name": "Bouvet Island"},
{"name": "Brazil"},
{"name": "Brunei Darussalam"},
{"name": "Bulgaria"},
{"name": "Burkina Faso"},
{"name": "Burundi"},
{"name": "Cambodia"},
{"name": "Cameroon"},
{"name": "Canada"},
{"name": "Cape Verde"},
{"name": "Cayman Islands"},
{"name": "Central African Republic"},
{"name": "Chad"},
{"name": "Chile"},
{"name": "China"},
{"name": "Christmas Island"},
{"name": "Cocos (Keeling) Islands"},
{"name": "Colombia"},
{"name": "Comoros"},
{"name": "Congo"},
{"name": "Cook Islands"},
{"name": "Costa Rica"},
{"name": "Cote D'Ivoire"},
{"name": "Croatia"},
{"name": "Cuba"},
{"name": "Cyprus"},
{"name": "Czech Republic"},
{"name": "Denmark"},
{"name": "Djibouti"},
{"name": "Dominica"},
{"name": "Dominican Republic"},
{"name": "Ecuador"},
{"name": "Egypt"},
{"name": "El Salvador"},
{"name": "Equatorial Guinea"},
{"name": "Eritrea"},
{"name": "Estonia"},
{"name": "Ethiopia"},
{"name": "Falkland Islands (Malvinas)"},
{"name": "Faroe Islands"},
{"name": "Fiji"},
{"name": "Finland"},
{"name": "France"},
{"name": "French Guiana"},
{"name": "French Polynesia"},
{"name": "French Southern Territories"},
{"name": "Gabon"},
{"name": "Gambia"},
{"name": "Georgia"},
{"name": "Germany"},
{"name": "Ghana"},
{"name": "Gibraltar"},
{"name": "Greece"},
{"name": "Greenland"},
{"name": "Grenada"},
{"name": "Guadeloupe"},
{"name": "Guam"},
{"name": "Guatemala"},
{"name": "Guernsey"},
{"name": "Guinea"},
{"name": "Guinea-Bissau"},
{"name": "Guyana"},
{"name": "Haiti"},
{"name": "Honduras"},
{"name": "Hong Kong"},
{"name": "Hungary"},
{"name": "Iceland"},
{"name": "India"},
{"name": "Indonesia"},
{"name": "Iran, Islamic Republic Of"},
{"name": "Iraq"},
{"name": "Ireland"},
{"name": "Isle of Man"},
{"name": "Israel"},
{"name": "Italy"},
{"name": "Jamaica"},
{"name": "Japan"},
{"name": "Jersey"},
{"name": "Jordan"},
{"name": "Kazakhstan"},
{"name": "Kenya"},
{"name": "Kiribati"},
{"name": "Korea, Republic of"},
{"name": "Kuwait"},
{"name": "Kyrgyzstan"},
{"name": "Latvia"},
{"name": "Lebanon"},
{"name": "Lesotho"},
{"name": "Liberia"},
{"name": "Libyan Arab Jamahiriya"},
{"name": "Liechtenstein"},
{"name": "Lithuania"},
{"name": "Luxembourg"},
{"name": "Macao"},
{"name": "Madagascar"},
{"name": "Malawi"},
{"name": "Malaysia"},
{"name": "Maldives"},
{"name": "Mali"},
{"name": "Malta"},
{"name": "Marshall Islands"},
{"name": "Martinique"},
{"name": "Mauritania"},
{"name": "Mauritius"},
{"name": "Mayotte"},
{"name": "Mexico"},
{"name": "Moldova, Republic of"},
{"name": "Monaco"},
{"name": "Mongolia"},
{"name": "Montserrat"},
{"name": "Morocco"},
{"name": "Mozambique"},
{"name": "Myanmar"},
{"name": "Namibia"},
{"name": "Nauru"},
{"name": "Nepal"},
{"name": "Netherlands"},
{"name": "Netherlands Antilles"},
{"name": "New Caledonia"},
{"name": "New Zealand"},
{"name": "Nicaragua"},
{"name": "Niger"},
{"name": "Nigeria"},
{"name": "Niue"},
{"name": "Norfolk Island"},
{"name": "Northern Mariana Islands"},
{"name": "Norway"},
{"name": "Oman"},
{"name": "Pakistan"},
{"name": "Palau"},
{"name": "Panama"},
{"name": "Papua New Guinea"},
{"name": "Paraguay"},
{"name": "Peru"},
{"name": "Philippines"},
{"name": "Pitcairn"},
{"name": "Poland"},
{"name": "Portugal"},
{"name": "Puerto Rico"},
{"name": "Qatar"},
{"name": "Reunion"},
{"name": "Romania"},
{"name": "Russian Federation"},
{"name": "RWANDA"},
{"name": "Saint Helena"},
{"name": "Saint Kitts and Nevis"},
{"name": "Saint Lucia"},
{"name": "Samoa"},
{"name": "San Marino"},
{"name": "Sao Tome and Principe"},
{"name": "Saudi Arabia"},
{"name": "Senegal"},
{"name": "Serbia and Montenegro"},
{"name": "Seychelles"},
{"name": "Sierra Leone"},
{"name": "Singapore"},
{"name": "Slovakia"},
{"name": "Slovenia"},
{"name": "Solomon Islands"},
{"name": "Somalia"},
{"name": "South Africa"},
{"name": "Spain"},
{"name": "Sri Lanka"},
{"name": "Sudan"},
{"name": "Suriname"},
{"name": "Svalbard and Jan Mayen"},
{"name": "Swaziland"},
{"name": "Sweden"},
{"name": "Switzerland"},
{"name": "Syrian Arab Republic"},
{"name": "Tajikistan"},
{"name": "Thailand"},
{"name": "Timor-Leste"},
{"name": "Togo"},
{"name": "Tokelau"},
{"name": "Tonga"},
{"name": "Trinidad and Tobago"},
{"name": "Tunisia"},
{"name": "Turkey"},
{"name": "Turkmenistan"},
{"name": "Turks and Caicos Islands"},
{"name": "Tuvalu"},
{"name": "Uganda"},
{"name": "Ukraine"},
{"name": "United Arab Emirates"},
{"name": "United Kingdom"},
{"name": "United States"},
{"name": "Uruguay"},
{"name": "Uzbekistan"},
{"name": "Vanuatu"},
{"name": "Venezuela"},
{"name": "Viet Nam"},
{"name": "Virgin Islands, British"},
{"name": "Virgin Islands, U.S."},
{"name": "Wallis and Futuna"},
{"name": "Western Sahara"},
{"name": "Yemen"},
{"name": "Zambia"},
{"name": "Zimbabwe"}
]













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

class FormSecondPage extends Component {


  constructor(props){
    super(props)
    this.state = {
      loader: false
    }
    this.handleLoaderState = this.handleLoaderState.bind(this)
  }

  handleLoaderState(){
    this.setState({loader: true}, ()=>{
      setTimeout(()=>{this.setState({loader:false})}, 1000)
    })
  }

  render(){
    const { handleSubmit, previousPage } = this.props
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
          <div style={{marginBottom: "20px"}}>
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
          <div onClick={this.handleLoaderState}>
            <Field name="nationality" component={SelectField} 
                  hintText="Select your nationality" 
                  selectedMenuItemStyle={{color: "#00BCD4"}} 
                  underlineStyle={{display: "none"}} 
                  errorStyle={{display: "none"}}>
              {countries.map(country => <MenuItem value={country.name} primaryText={country.name}/>)}
            </Field>
          </div>





          {this.state.loader && <span style={{marginLeft: "300px"}}><CircularProgress /></span>}






          <Field name="nationality" component={renderError} />
        </div>
        <Col xs={12} sm={6} md={3} lg={5} style={{marginTop: "113px"}}>
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
}

export default reduxForm({
  form: 'wizard', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(FormSecondPage)













