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
import Animation from 'react-addons-css-transition-group'
import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from './forms/form_material_styles'
import TopCounter from "./topCounter"


import geolib from "geolib" //distance calculator


import { config } from "dotenv"
config()


const google = window.google


class CreateCampaign extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.updateMarker = this.updateMarker.bind(this)
    this.createRoute = this.createRoute.bind(this)
    this.state = {
      page: 1,
      slide: false,
      userMarker: {
        position: {
          lat: 0,
          lng: 0
        }
      },
      workMarkers: [
        {
          position: {   //UB6-8UH, ADD EXTRA TO THIS ARRAY
            lat: 51.54318,
            lng: -0.359016
          }
        },
        {
          position: {        //SL4
            lat: 51.460677,
            lng: -0.648235
          }
        }
      ],
      origin: null,   //LEAVE IT AS USER ALWAYS
      destination: null, //MAKE IT ALSO ARRAY
      directions: null,    //WORK WITH THIS STATE HERE TO MAKE MULTIPLE ROUTES , MAKE IT ARRAY
    }
  }

  nextPage() {
    this.setState({ page: this.state.page + 1, slide: true })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  updateMarker(newMarker={}){
    this.setState({
      userMarker: newMarker
    })
  }

  createRoute(){

    let destinationsArray = []
    destinationsArray = this.state.workMarkers.map((venue, i) => {
      return venue.position
    })

    this.setState({
      origin: this.state.userMarker.position,
      destination: destinationsArray,
      directions: null,
    }, () => {
      let directionsArray = []

      let lengthToMap = this.state.destination.length
      let mappedAlready = 0


      this.state.destination.map((venue, i) => {



        MIGHT HAVE TO WRAP THE BELOW AND DISTANCEMATRIXSERVICE() IN ONE


        const DirectionsService = new google.maps.DirectionsService();
        DirectionsService.route({
          origin: this.state.origin,
          destination: venue,
          travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => { 

          if(this.state.userMarker.position.lat !== 0){
            directionsArray.push(result)
          }

          mappedAlready++

          if(mappedAlready === lengthToMap){
            setDirections()
          }


          if(status === google.maps.DirectionsStatus.OK) {
            console.log("okay")

            //THIS CODE RIGHT HERE BELOW

            //MIGHT NOT BE NEEDED. MIGHT HAVE TO USE 
            //MATRIXRESPONSE() INSTEAD AS I NEED TIME
            //AS WELL ETC

            var tDist = 0;
            var nlegs = result.routes[0].legs.length;
            for (var i = 0; i < nlegs; i++) {
                tDist += result.routes[0].legs[i].distance.value;
            }
            //directionsRenderer.setDirections(result);
            //alert("distance: "+tDist);

            var node = document.createElement("LI");                 // Create a <li> node
            var textnode = document.createTextNode(tDist);         // Create a text node
            node.appendChild(textnode);                              // Append the text to <li>
            document.getElementById("root").appendChild(node);     // Append <li> to <ul> with id="myList"

          }else{
            console.error(`error fetching directions ${result}`);
          }
        })
      })

      let setDirections = ()=>{
        if(directionsArray.length >= 1){

         this.setState({
           directions: directionsArray,
         }, ()=>{})
       }
     }

    })
  }

  render() {
    const { onSubmit } = this.props
    const { page } = this.state
    return (
      //<div className={`form-container ${this.state.slide ? 'slide' : ''}`}>

        <Grid className='form-container'>
          <Row center="xs">
            <Col xs={13} sm={12} md={2} lg={8}>
              {page === 1 && 
                <div>
                  <h2>PLEASE APPLY FOR THIS JOB BY REGISTERING WITH US.</h2>
                  <h3>*select jobs you wish to apply for*</h3>
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
              {page === 1 && 
                <RaisedButton primary={true} 
                style={styles.raisedButtonStyle}
                label="APPLY"
                onClick={this.nextPage}/>}
                <Animation
                    transitionName='fade'
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                >
                  {page === 2222 &&
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
                      createRoute={this.createRoute}
                      directions={this.state.directions}
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
