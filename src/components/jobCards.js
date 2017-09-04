import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { Checkbox } from "material-ui"
import jobs from "../jobs.json"
import { Field, FieldArray, reduxForm } from 'redux-form'
import { connect } from "react-redux"
import { getFormValues } from 'redux-form'

class jobsSelected extends Component{
  constructor(props){
    super(props)
    this.state = {
      checked: false
    }
  }
  updateCheck() {
    this.setState((oldState) => {
      return {
        checked: !oldState.checked,
      }
    }, ()=>{
      if(this.state.checked){
        this.props.fields.push(this.props.jobSelected)
      }
      else if(!this.state.checked){
        this.props.jobsSelectedValues.map((singleField, index)=>{
          if(this.props.jobSelected === singleField){
            this.props.fields.remove(index)
          }
        })
      }
    })
  }
  render(){
    return(
      <div>
        <Checkbox 
          disableTouchRipple
          onCheck={this.updateCheck.bind(this)}
        />
      </div>
    )
  }
}

jobsSelected = connect(
  state => {
    if(state.form.wizard.values){
      return{
        jobsSelectedValues: state.form.wizard.values.jobsSelected,
      }
    }
  }
)(jobsSelected)

class CardExampleExpandable extends Component{
  render(){
    const tickButtonStyle = {
      position: "Absolute",
      marginLeft: "-10px"
    }
    const cardStyle = {
      marginTop: "20px",
    }
    return(
      <div>
        {jobs.map((job) => {
          let title = job.title
          if(title.length > 20){
            title = title.substring(0, 20) + "..."
          }
          return(
            <div>
            <div style={tickButtonStyle}>
              <FieldArray 
                name="jobsSelected" 
                component={jobsSelected}
                jobSelected={job.id}
              />
            </div>
            <Card style={cardStyle}>
              <CardHeader
                title={title}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true} style={{paddingBottom: "1px", paddingTop: "1px"}}>
              <div style={{borderTop: "1px solid #DCDCDC", paddingTop: "10px"}}>
                <div style={{maxWidth: "500px", margin: "0 auto", textAlign: "left"}}>
                  <div>Job Title:</div>
                  <div>{job.title}</div>
                  <br />
                  <div>Sector:</div>
                  <div>{job.sector}</div>
                  <br />
                  <div>Position:</div>
                  <div>{job.position}</div>
                  <br />
                  <div>Job Description:</div>
                  <div>{job.description}</div>
                  <br />
                  <div>Terms:</div>
                  <div>{job.terms}</div>
                  <br />
                  <div>Work Postcode:</div>
                  <div>{job.work_postalcode}</div>
                  <br />
                  <div>Salary:</div>
                  <div>{job.salary}</div>
                  <br />
                  <div>Start Date:</div>
                  <div>{job.start_date}</div>
                </div>
              </div>
            </CardText>
          </Card>
          </div>
        )
        })}
      </div>
    )
  }
}

export default reduxForm({
  form: 'wizard',  // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(CardExampleExpandable)
