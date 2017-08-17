import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerJobseeker } from '../actions';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { RadioButton } from 'material-ui/RadioButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem';

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


class HomeComponent extends Component {

  //COMPONENT WILL/DID MOUNT - FETCH ACTIVE CAMPAIGNS ID'S
  //ATTACH THEM TO SELECTOR FOR JOB CAMPAIGNS
  //POSITIONS - LOADER,DRIVER, ETC ???? THE SAME AS ABOVE?

  state = {
    value: null,
  };



  renderSelectField(field){
    return(
      <SelectField
        floatingLabelText={field.label}
        errorText={field.touched && field.error}
        {...field}

        >
      </SelectField>
    );
  }

  renderField(field){
    return(

        <TextField
          floatingLabelText={field.label}
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          fullWidth={true}
          {...field.input}
        />

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

  render(){
    const {handleSubmit} = this.props;

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
            <Field name="favoriteColor" component={this.renderSelectField} label="Favorite Color">
              <MenuItem value={'ff0000'} primaryText="Red"/>
              <MenuItem value={'00ff00'} primaryText="Green"/>
              <MenuItem value={'0000ff'} primaryText="Blue"/>
            </Field>
          </Col>
        </Row>

        <Row center="xs">
          <RaisedButton type="submit" label="Submit" primary={true} style={styles.raisedButtonStyle} />
          <Link to='/register'>
            <RaisedButton label="Cancel" secondary={true} style={styles.raisedButtonStyle} />
          </Link>
        </Row>
        </Paper>
      </form>

    );
  }
}
export default reduxForm({
  form: 'PostsNewForm'
})(connect(null, { registerJobseeker })(HomeComponent));
