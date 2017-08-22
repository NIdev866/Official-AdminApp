import React from 'react'
import TextField from 'material-ui/TextField'
import {blue500, grey400} from 'material-ui/styles/colors'

const styles = {
  floatingLabelStyle: {
    color: grey400,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  }
};

const renderField = ({ input, label, type, meta: { touched, error } }) => {

  return(
    <div>
      <TextField
        floatingLabelText={label}
        floatingLabelStyle={styles.floatingLabelStyle}
        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        fullWidth={true}
        primary={true}
        {...input}
      />
      <div style={{color: "red"}}>
        {touched ? <span>{error}</span> : ""}
      </div>
    </div>
  )
}

export default renderField
