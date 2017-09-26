import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row, Col } from 'react-flexbox-grid'
import styles from './createCampaignApp/forms/form_material_styles'
import Animation from 'react-addons-css-transition-group'
import { config } from "dotenv"
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';

import WorkforceTabParent from "./tabPages/workforceTabParent"
import ApplicantsTabParent from "./tabPages/applicantsTabParent"
import ClientsTabParent from "./tabPages/clientsTabParent"
import StatisticsTabParent from "./tabPages/statisticsTabParent"

config()
class JobseekerParent extends Component {
  constructor(props){
    super(props)
    this.handleWhichTab = this.handleWhichTab.bind(this)
  }
  handleWhichTab(){
    switch (this.props.tabOpen) {
      case "workforce":
        return <WorkforceTabParent />
      case "applicants":
        return <ApplicantsTabParent />
      case "clients":
        return <ClientsTabParent />
      case "statistics":
        return <StatisticsTabParent />
      default:
        return null;
    }
  }
  render() {
    const footerStyle = {
      position: "absolute",
      left: "0",
      bottom: "0",
      paddingBottom: "2px",
      width: "100%",
      borderTop: "1px solid",
      borderColor: "#DCDCDC",
      backgroundColor: "white",
      zIndex: "8000",
      overflow: "hidden",
      height: "60px"
    }
    return (
      <div style={{position: "relative"}}>
        <div style={{borderBottom: "1px solid #CCCCCC", position: "relative", width: "100vw", margin: "0 auto", height: '50px'}}>
          <Tabs>
            <Tab onActive={this.props.workforceClick} style={{marginTop: '-12px', marginBottom: '-10px'}} icon={<FontIcon className="material-icons">person</FontIcon>} label="WORKFORCE" />
            <Tab onActive={this.props.applicantsClick} style={{marginTop: '-12px', marginBottom: '-10px'}} icon={<FontIcon className="material-icons">person_add</FontIcon>} label="APPLICANTS" />
            <Tab onActive={this.props.clientsClick} style={{marginTop: '-12px', marginBottom: '-10px'}} icon={<FontIcon className="material-icons">domain</FontIcon>} label="CLIENTS" />
            <Tab onActive={this.props.statisticsClick} style={{marginTop: '-12px', marginBottom: '-10px'}} icon={<FontIcon className="material-icons">equalizer</FontIcon>} label="STATISTICS" />
          </Tabs>
        </div>
        {this.handleWhichTab()}
      </div>
    )
  }
}

JobseekerParent.propTypes = {
  onSubmit: PropTypes.func.isRequired
}


export default JobseekerParent