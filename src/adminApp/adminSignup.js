import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signupUser, clearAuthError } from '../actions';
import renderField from './renderField'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'

class Signup extends Component {
  constructor() {
    super();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps)
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div style={{color: "red"}}>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  componentDidMount(){
    this.props.clearAuthError()
  }
  render() {
    const { handleSubmit } = this.props;   
    return (
      <div style={{maxWidth: "500px", margin: "0 auto"}}>
        <div style={{marginRight: "15px", marginLeft: "15px"}}>
          {!this.props.authenticated &&
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <Field
                name="email"
                type="text"
                component={renderField}
                label="Email"
              />
              <Field
                name="password"
                type="password"
                component={renderField}
                label="Password"
              />
              <Field
                name="passwordConfirm"
                type="password"
                component={renderField}
                label="Confirm Password"
              />
              {this.renderAlert()}
              <RaisedButton
                type="submit"
                label="SIGN UP"
                primary={true}
              />
            </form>
          }
        </div>
      </div>
    )
  }
}

function validate(formProps) {
  const errors = {};
  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid email address'
  }else if(formProps.email.length > 30) {
    errors.email = 'Input too long'
  }
  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }
  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated
  };
}

export default reduxForm({
  form: 'signup',
  validate
})(
  connect(mapStateToProps, { signupUser, clearAuthError })(Signup)
);
