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
  "Afghanistan",
  "Åland Islands",
  "Albania",
  "Algeria",
  "American Samoa",
  "AndorrA",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands (Malvinas)",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran, Islamic Republic Of",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, Republic of",
  "Kuwait",
  "Kyrgyzstan",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libyan Arab Jamahiriya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Moldova, Republic of",
  "Monaco",
  "Mongolia",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russian Federation",
  "RWANDA",
  "Saint Helena",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia and Montenegro",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Tajikistan",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Viet Nam",
  "Virgin Islands, British",
  "Virgin Islands, U.S.",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe"
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
              {countries.map(country => <MenuItem value={country} primaryText={country}/>)}
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













