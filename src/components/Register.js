import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerJobseeker } from '../actions';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { RadioButton } from 'material-ui/RadioButton'

import MenuItem from 'material-ui/MenuItem';

import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
} from 'redux-form-material-ui'


import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {orange500, blue500, grey400} from 'material-ui/styles/colors';



const styles = {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: grey400,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
  raisedButtonStyle:{
    margin: 20
  },
  selectStyle:{
    customWidth:{
      width:150
    }
  }
};


class RegisterComponent extends Component {

  //COMPONENT WILL/DID MOUNT - FETCH ACTIVE CAMPAIGNS ID'S
  //ATTACH THEM TO SELECTOR FOR JOB CAMPAIGNS
  //POSITIONS - LOADER,DRIVER, ETC ???? THE SAME AS ABOVE?

  state = {
    value: null,
  };

  renderField(field){
    return(
      <div>
        <TextField
          floatingLabelText={field.label}
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          fullWidth={true}
          {...field.input}
        />
      </div>
    );
  }

  onSubmit(values){
    console.log(values);
    // this.props.createPost(values, () => {
    //   this.props.history.push('/');
    // });
  }

  handleChange(event, index, value){
    //this.setState({value});
    console.log(value);
  }

  renderSelectedCampaignsIds(){

    return this.props.selectedCampaigns.map((campaignId)=>{

      return(
        <li key={campaignId}>{campaignId}</li>
      )
    })
  }

  render(){

    const {handleSubmit } = this.props;

    return(

      <form className='form-container' onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h1>PLEASE APPLY FOR THIS JOB BY REGISTERING WITH US.</h1>
        <Paper zDepth={4} rounded={false}>
        <Row center="xs">
          <Col xs={12} sm={6} md={3} lg={5}>
            <Field
              label='Forename'
              name='forename'
              component={this.renderField}
            />
            <Field
              label='Middle Name if any'
              name='middlename'
              component={this.renderField}
            />
            <Field
              label='Surname'
              name='surname'
              component={this.renderField}
            />
            <Field
              label='Email address'
              name='email'
              component={this.renderField}
            />
            <Field name="whenstart" component={RadioButtonGroup}>
              <RadioButton value="Immediately" label="I'm free, can start work immediately."/>
              <RadioButton value="inFewDays" label="I'm busy Tomorrow, can start within next few days."/>
              <RadioButton value="nextWeek" label="I'm busy this Week, can start from Monday following week."/>
              <RadioButton value="nextMonth" label="I'm busy until end of this Month, can start from next month."/>
            </Field>
          </Col>
          <Col xs={12} sm={6} md={3} lg={5}>
            <Field
              label='House of Flat number'
              name='housenumber'
              component={this.renderField}
            />
            <Field
              label='Road name'
              name='roadname'
              component={this.renderField}
            />
            <Field
              label='Town'
              name='town'
              component={this.renderField}
            />
            <Field
              label='Postal code'
              name='postalcode'
              component={this.renderField}
            />

            <Field name="plan" component={SelectField} hintText="Select your age group">
              <MenuItem value="18-21" primaryText="I'm between 18-21 yrs old"/>
              <MenuItem value="21-29" primaryText="I'm between 21-29 yrs old"/>
              <MenuItem value="30-39" primaryText="I'm between 30-39 yrs old"/>
              <MenuItem value="40-49" primaryText="I'm between 40-49 yrs old"/>
              <MenuItem value="50-59" primaryText="I'm between 50-59 yrs old"/>
            </Field>

          </Col>
        </Row>

        <Row center="xs">
          <RaisedButton type="submit" label="Submit" primary={true} style={styles.raisedButtonStyle} />
          <Link to='/'>
            <RaisedButton label="Cancel" secondary={true} style={styles.raisedButtonStyle} />
          </Link>
        </Row>
        </Paper>
        <div>
          <ul>{this.renderSelectedCampaignsIds()}</ul>
        </div>
      </form>



    );
  }
}

function mapStateToProps({campaigns}){
  return {
    selectedCampaigns: campaigns.selectedCampaigns

  };
}
export default reduxForm({
  form: 'PostsNewForm'
})(connect(mapStateToProps, { registerJobseeker })(RegisterComponent));
