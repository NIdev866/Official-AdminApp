import React, { Component, PropTypes } from 'react'
import FormFirstPage from './forms/form_1'
import FormSecondPage from './forms/form_2'
import FormThirdPage from './forms/form_3'
import FormFourthPage from './forms/form_4'
import FormFifthPage from './forms/form_5'
import FormSixthPage from "./forms/form_6"
import FormSeventhPage from "./forms/form_7"
import FormEithPage from "./forms/form_8"
import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row, Col } from 'react-flexbox-grid'
import styles from './forms/form_material_styles'
import TopCounter from "./topCounter"
import Animation from 'react-addons-css-transition-group'
import { config } from "dotenv"
import JobCards from "./jobCards"





config()
const google = window.google


class CreateCampaign extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.updateMarker = this.updateMarker.bind(this)
    this.createRoutesAndDuration = this.createRoutesAndDuration.bind(this)
    this.handleWorkBoxDisplay = this.handleWorkBoxDisplay.bind(this)
    this.state = {
      slide: "toLeft",
      page: 1,
      userMarker: {
        position: {
          lat: 0,
          lng: 0
        }
      },
      workMarkers: [
        {
          name: "Ub8 hardcoded address",
          position: {   //UB6-8UH (hardcoded required)
            lat: 51.54318,
            lng: -0.359016
          }
        },
        {
          name: "test of a very long employment place name",
          position: {        //SL4
            lat: 51.460677,
            lng: -0.648235
          }
        },
        {
          name: "manchester work",
          position: {
            lat: 53.483959,
            lng: -2.244644
          }
        },
        {
          name: "farnham shop",
          position: { 
            lat: 51.524832,
            lng: -0.615393
          }
        },
      ],
      origin: null,
      destination: null,
      routes: null,
      display_work_box: false, //change to false after production
      durations: null,  //THIS WILL CONTAIN DistanceMatrixService() results
    }
  }
  nextPage() {
    this.setState({ 
      page: this.state.page + 1,
      slide: "toLeft"
    })
  }
  previousPage() {
    this.setState({ 
      page: this.state.page - 1,
      slide: "toRight"
    })
  }
  updateMarker(newMarker={}){
    this.setState({
      userMarker: newMarker
    })
  }
  handleWorkBoxDisplay(value){
    this.setState({
      display_work_box: value
    })
  }
  createRoutesAndDuration(){
    let destinationsArray = []
    destinationsArray = this.state.workMarkers.map((venue, i) => {
      return venue.position
    })
    this.setState({
      origin: this.state.userMarker.position,
      destination: destinationsArray,
      routes: null,
    }, () => {
      let routesArray = []
      let durationsArray = []
      let lengthToMap = this.state.destination.length
      let routesMappedAlready = 0
      let durationsMappedAlready = 0
      this.state.destination.map((venue, i) => {
        const RoutesService = new google.maps.DirectionsService();
        RoutesService.route({
          origin: this.state.origin,
          destination: venue,
          travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => { 
          if(this.state.userMarker.position.lat !== 0){
            routesArray.push(result)
            this.handleWorkBoxDisplay(true)
          }
          else{
            this.handleWorkBoxDisplay(false)
          }
          routesMappedAlready++
          if(routesMappedAlready === lengthToMap){
            setRoutes()
          }
          if(status === google.maps.DirectionsStatus.OK) {
            console.log("okay")
          }else{
            console.error(`error fetching directions ${result}`);
          }
        })
        const DurationService = new google.maps.DistanceMatrixService();
        const destinationsToGetDistance = this.state.workMarkers.map((value)=>{
          return value.position
        })
        DurationService.getDistanceMatrix({
            origins: [this.state.userMarker.position],
            destinations: destinationsToGetDistance,
            travelMode: 'DRIVING',
            avoidHighways: false,
            avoidTolls: false,
          }, (result, status) => { 
          if(this.state.userMarker.position.lat !== 0){
            durationsArray.push(result)
          }
          durationsMappedAlready++
          if(durationsMappedAlready === lengthToMap){
            setDurations()
          }
          if(status === google.maps.DirectionsStatus.OK) {
            console.log("okay")
          }else{
            console.error(`error fetching directions ${result}`);
          }
        });
      })
      let setRoutes = ()=>{
        if(routesArray.length >= 1){
          this.setState({
            routes: routesArray,
          }, ()=>{})
        }
      }
      let setDurations = ()=>{
        if(durationsArray.length >= 1){
          this.setState({
            durations: durationsArray,
          }, ()=>{})
        }
      }
    })
  }
  render() {
    const footerStyle = {
      textAlign: "center",
      position: "fixed",
      left: "0",
      bottom: "0",
      paddingBottom: "2px",
      minHeight: "40px",
      width: "100%",
      borderTop: "1px solid",
      borderColor: "#DCDCDC",
      backgroundColor: "white",
      zIndex: "8000",
      overflow: "hidden"
    }
    const { onSubmit } = this.props
    const { page } = this.state
    return (
      <Grid className='form-container'>
        <Row center="xs">
          <Col xs={13} sm={12} md={2} lg={8}>
            {page === 1 && 
              <div>
                <h2>PLEASE APPLY FOR THIS JOB BY REGISTERING WITH US.</h2>
                <h3>Select maximum 3 job boxes to apply for them.<br/>
                    Click on the job to read more about it</h3>
                <JobCards />
              </div>
            }
            {page > 1 && 
              <TopCounter 
                finishedStep={this.state.page}
              />}
          </Col>
        </Row>
        <Row center="xs">
          <Col xs={12} sm={12} md={2} lg={8}>
            {page === 1 && <div style={footerStyle}>
              <RaisedButton primary={true} 
              style={styles.raisedButtonStyle}
              label="APPLY"
              onClick={this.nextPage}/></div>}
              <Animation
                transitionName={this.state.slide}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
                transitionAppear={true}
                transitionAppearTimeout={500}
              >
                {page === 22222 &&
                  <FormFirstPage 
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage} 
                  />}
                {page === 3 &&
                  <FormSecondPage
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                  />}
                {page === 4 &&
                  <FormThirdPage
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                  />}
                {page === 5 &&
                  <FormFourthPage
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                  />}
                {page === 2 &&
                  <FormFifthPage
                    display_work_box={this.state.display_work_box}
                    distances={this.state.distances}
                    createRoutesAndDuration={this.createRoutesAndDuration}
                    routes={this.state.routes}
                    durations={this.state.durations}
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                    userMarker={this.state.userMarker}
                    workMarkers={this.state.workMarkers}
                    updateMarker={this.updateMarker}
                  />}
                {page === 7 &&
                  <FormSixthPage 
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                  />}
                {page === 8 &&
                  <FormSeventhPage 
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                  />}
                {page === 9 &&
                  <FormEithPage 
                    previousPage={this.previousPage}
                    onSubmit={onSubmit}
                  />}
            </Animation>
          </Col>
        </Row>
      </Grid>
    )
  }
}

CreateCampaign.propTypes = {
  onSubmit: PropTypes.func.isRequired
}



export default CreateCampaign