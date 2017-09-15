import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signoutUser } from '../actions';
import { Redirect } from 'react-router'

class Signout extends Component { 
  componentWillMount() {
    this.props.signoutUser();
  }
  
  render() {   
    return <Redirect to="/admin/signin"/>
  }
}

export default connect(null, { signoutUser })(Signout)
