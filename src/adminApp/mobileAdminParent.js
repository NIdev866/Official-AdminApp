import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row, Col } from 'react-flexbox-grid'
import styles from './createCampaignApp/forms/form_material_styles'
import Animation from 'react-addons-css-transition-group'
import { config } from "dotenv"
import MobileSlideComponent from "./mobileSlideComponent"
import MobileMapComponent from "./mobileMapComponent"
import { connect } from 'react-redux'
import { Marker } from "react-google-maps"
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


import { Redirect } from 'react-router'


config()
const google = window.google


class JobseekerParent extends Component {
  constructor(props){
    super(props)
    this.state = {
      slider: "closed",
      tabOpen: "workforce",
      jobAdAddClicked: false
    }
    this.workforceClick = this.workforceClick.bind(this)
    this.applicantsClick = this.applicantsClick.bind(this)
    this.clientsClick = this.clientsClick.bind(this)
    this.statisticsClick = this.statisticsClick.bind(this)
    this.jobAdAddClick = this.jobAdAddClick.bind(this)
  }
  workforceClick(){
    if(this.state.slider == "closed"){
      this.setState({tabOpen: "workforce", slider: "open"})
    }
    else if(this.state.slider == "open" && this.state.tabOpen == "workforce"){
      this.setState({slider: "closed"})
    }
    else if(this.state.slider == "open" && this.state.tabOpen !== "workforce"){
      this.setState({tabOpen: "workforce"})
    }
  }
  applicantsClick(){
    if(this.state.slider == "closed"){
      this.setState({tabOpen: "applicants", slider: "open"})
    }
    else if(this.state.slider == "open" && this.state.tabOpen == "applicants"){
      this.setState({slider: "closed"})
    }
    else if(this.state.slider == "open" && this.state.tabOpen !== "applicants"){
      this.setState({tabOpen: "applicants"})
    }
  }
  clientsClick(){
    if(this.state.slider == "closed"){
      this.setState({tabOpen: "clients", slider: "open"})
    }
    else if(this.state.slider == "open" && this.state.tabOpen == "clients"){
      this.setState({slider: "closed"})
    }
    else if(this.state.slider == "open" && this.state.tabOpen !== "clients"){
      this.setState({tabOpen: "clients"})
    }
  }
  statisticsClick(){
    if(this.state.slider == "closed"){
      this.setState({tabOpen: "statistics", slider: "open"})
    }
    else if(this.state.slider == "open" && this.state.tabOpen == "statistics"){
      this.setState({slider: "closed"})
    }
    else if(this.state.slider == "open" && this.state.tabOpen !== "statistics"){
      this.setState({tabOpen: "statistics"})
    }
  }






  jobAdAddClick(){
    this.setState({jobAdAddClicked: true}, ()=>{setTimeout(()=>{this.setState({timeToReroute: true})}, 500)})
  }







  render() {
    let sliderStyle = {}
    if(this.state.slider == "closed"){
      sliderStyle = {
        overflow: "hidden",
        position: "absolute",
        transition: "all .2s ease-in-out",
        height: "50px",
        backgroundColor: "white",
        borderTop: "1px solid #CCCCCC",
        width: "100vw",
        top: "calc(100vh - 51px)",
        zIndex: '3'
      }
    }
    else{
      sliderStyle = {
        overflow: "hidden",
        position: "absolute",
        transition: "all .2s ease-in-out",
        height: "100vh",
        backgroundColor: "white",
        width: "100vw",
        top: "0px",
        zIndex: '3'
      }
    }
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    };

    const adButtonStyle = {
      position: 'absolute',
      bottom: '70px', 
      right: '20px',
      zIndex: '2',
    }

    const adTextStyle = {
      position: 'absolute',
      bottom: '81px', 
      right: '29px',
      zIndex: '4',
      pointerEvents: "none", 
      fontSize: "11px",
      color: "white"
    }
    let jobAdAddTransitionStyle = {}
    if(this.state.jobAdAddClicked){
      jobAdAddTransitionStyle = {
        transition: "all .5s ease-in-out",
        pointerEvents: "none", 
        width: "955px",
        height: "955px",
        backgroundColor: "white",
        zIndex: "4",
        borderRadius: "50%",
        position: 'absolute',
        bottom: '-200px', 
        right: '-200px',
      }
    }
    else{
      jobAdAddTransitionStyle = {
        transition: "all .5s ease-in-out",
        pointerEvents: "none", 
        width: "1px",
        height: "1px",
        backgroundColor: "rgb(0,188,212)",
        zIndex: "4",
        borderRadius: "50%",
        position: 'absolute',
        bottom: '90px', 
        right: '40px',
      }
    }
    return (
        <div style={{position: "relative", width: "100vw", height: "100vh", overflow: "hidden"}}>
          <div style={{position: "absolute", height: "calc(100vh - 50px)", width: "100vw", zIndex: '1'}}>
              <MobileMapComponent 
                zoom={10}
                center={{ lat: 51.537452, lng: -0.497681}}
                containerElement={<div style={{height: 100+"%"}} />}
                mapElement={<div style={{height: 100+"%"}} />}
              />
          </div>
          <FloatingActionButton onClick={this.jobAdAddClick} style={adButtonStyle}>
            <div>
              <ContentAdd style={{color: "white"}}></ContentAdd>
            </div>
          </FloatingActionButton>
          <div style={adTextStyle}>JOB AD</div>
          <div style={jobAdAddTransitionStyle}></div>
          <div style={sliderStyle}>
            <MobileSlideComponent
              workforceClick={this.workforceClick}
              applicantsClick={this.applicantsClick}
              clientsClick={this.clientsClick}
              statisticsClick={this.statisticsClick}
              tabOpen={this.state.tabOpen}
             />
          </div>
          {this.state.timeToReroute && <Redirect to="/create-campaign"/>}
        </div>
    )
  }
}

export default JobseekerParent