import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router"

export default function(ComposedComponent) {
  class Authentication extends Component {
    
    componentWillMount() {
      if (!this.props.authenticated) {
        return <Redirect to="/adminauth"/>
      }
    }
    
    componentWillReceiveProps(nextProps) {
      if (!nextProps.authenticated) {
        return <Redirect to="/adminauth"/>
      }
    }
    
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  
  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }
  
  return connect(mapStateToProps)(Authentication);
}
