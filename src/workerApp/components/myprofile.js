import React, { Component } from "react"
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'

import { connect } from 'react-redux';
import * as actions from '../../actions';

class Myprofile extends Component{
  render(){
    return(
      <div>
        YOUR PROFILE
        {!this.props.bankDetailsSubmitted &&
          <RaisedButton
            type="button"
            label="SUBMIT"
            primary={true}
            onClick={this.props.submitBankDetails}
            style={{...styles.raisedButtonStyle, marginTop: "20px"}}
          />
        }
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    bankDetailsSubmitted: state.main.bankDetailsSubmitted
  }
}

export default connect(mapStateToProps, actions)(Myprofile);