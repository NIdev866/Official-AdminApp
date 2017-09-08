import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Nav from "./components/nav"
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import Progress from "./components/progress"


class AdminParent extends Component {
  render(){
    return(
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route path="/progress" component={Progress} />
        </Switch>
      </BrowserRouter>
    )
  }
}


export default AdminParent