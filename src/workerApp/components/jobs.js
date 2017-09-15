import React, { Component } from "react"
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from "react-router-dom"
import JobCards from "./jobCards"

class Jobs extends Component{  
  render(){
    const actions = [
    <Link to="/worker/myprofile">
      <FlatButton
        label="Go to my profile"
        primary={true}
      />
    </Link>
    ]

    return(
      <div style={{maxWidth: "800px", margin: "0 auto"}}>
        <Dialog
          style={{marginTop: "-120px"}}
          actions={actions}
          modal={true}
          overlayStyle={{opacity: "0.6"}}
          open={!this.props.bankDetailsSubmitted}
          onRequestClose={this.handleClose}
        >
          You have to enter your bank details and NI number first
        </Dialog>
        <JobCards />
      </div>
    )
  }
}


function mapStateToProps(state){
  return{
    bankDetailsSubmitted: state.main.bankDetailsSubmitted
  }
}

export default connect(mapStateToProps, actions)(Jobs);