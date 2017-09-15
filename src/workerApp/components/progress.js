import React, { Component } from "react"
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"
import * as actions from '../../actions';

class Progress extends Component{
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
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
        <div>PROGRESS HERE</div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    bankDetailsSubmitted: state.main.bankDetailsSubmitted
  }
}

export default connect(mapStateToProps, actions)(Progress);