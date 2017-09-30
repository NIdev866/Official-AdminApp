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


import SwipeableViews from 'react-swipeable-views';

config()
class TabComponent extends Component {
  constructor(props){
    super(props)
    this.handleWhichTab = this.handleWhichTab.bind(this)


    this.state = {
      slideIndex: 0,
    }
    this.handleSwipeChange = this.handleSwipeChange.bind(this)
  }


  handleSwipeChange(value){
    this.setState({
      slideIndex: value,
    }, ()=>{

      if(this.props.slider == 'closed'){
        switch (this.state.slideIndex) {
          case 0:
            return this.props.workforceClick()
          case 1:
            return this.props.applicantsClick()
          case 2:
            return this.props.clientsClick()
          case 3:
            return this.props.statisticsClick()
          default:
            return null;
        }
      }


    });
  };




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
    let wholeComponentStyle = {}
    if(this.props.screenWidth > 700){
      wholeComponentStyle = {
        borderBottom: "1px solid #CCCCCC", 
        position: "relative", 
        width: "100vw", 
        margin: "0 auto", 
        height: '50px'
      }
    }

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
        <div style={wholeComponentStyle}>
          <Tabs
          onChange={this.handleSwipeChange}
          value={this.state.slideIndex}
          >
            <Tab value={0} onActive={this.props.workforceClick} style={{marginTop: '-12px', marginBottom: '-10px'}} icon={<FontIcon className="material-icons">person</FontIcon>} label="WORKFORCE" />
            <Tab value={1} onActive={this.props.applicantsClick} style={{marginTop: '-12px', marginBottom: '-10px'}} icon={<FontIcon className="material-icons">person_add</FontIcon>} label="APPLICANTS" />
            <Tab value={2} onActive={this.props.clientsClick} style={{marginTop: '-12px', marginBottom: '-10px'}} icon={<FontIcon className="material-icons">domain</FontIcon>} label="CLIENTS" />
            <Tab value={3} onActive={this.props.statisticsClick} style={{marginTop: '-12px', marginBottom: '-10px'}} icon={<FontIcon className="material-icons">equalizer</FontIcon>} label="STATISTICS" />
          </Tabs>

          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleSwipeChange}
          >

            {/*this.handleWhichTab()*/}

            <WorkforceTabParent workforceClick={this.props.workforceClick}/>
            <ApplicantsTabParent applicantsClick={this.props.applicantsClick}/>
            <ClientsTabParent clientsClick={this.props.clientsClick}/>
            <StatisticsTabParent statisticsClick={this.props.statisticsClick}/>

          </SwipeableViews>

        </div>
      </div>
    )
  }
}

TabComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired
}


export default TabComponent