import React, { Component } from 'react'
import Header from './header'
import { connect } from 'react-redux'
import CreateCampaignParent from "./createCampaignApp/createCampaignParent"
import { Redirect } from 'react-router'

class App extends Component {
  render() {
    return (
      <div style={{maxWidth: "500px", margin: "0 auto"}}>
        <Header />
        {this.props.authenticated && <Redirect to="/admin/signin"/>}
        {!this.props.authenticated && <CreateCampaignParent />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(App);
