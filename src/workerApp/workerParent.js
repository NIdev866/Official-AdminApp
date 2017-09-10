import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Nav from "./components/nav"
import Progress from "./components/progress"

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router'

import { connect } from 'react-redux';
import * as actions from '../actions/all_actions';

class WorkerParent extends Component {
  render(){
    return(
      <div>
        {!this.props.bankDetailsSubmitted && <Redirect to="/worker/jobs"/>}
        <Nav />
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    bankDetailsSubmitted: state.main.bankDetailsSubmitted
  }
}

export default connect(mapStateToProps, actions)(WorkerParent);