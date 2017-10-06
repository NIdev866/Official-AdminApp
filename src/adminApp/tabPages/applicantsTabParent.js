import React, { Component } from 'react';
import _ from 'lodash'
import { fetchAllCampaigns, fetchAllJobseekersByCampaignId, 
  nestJobseekersIntoCampaigns, updateJobseekerJobStatus,
  clearAllJobseekersState} from '../../actions'
import { connect } from "react-redux"
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import axios from 'axios';


import globalThemes from '../../style/globalThemes.js'
import globalFonts from '../../style/globalFonts.js'




import {red500, yellow500, blue500} from 'material-ui/styles/colors';




class ApplicantsTabParent extends Component {
  componentWillMount(){
    if(!this.props.allCampaigns){
      this.props.fetchAllCampaigns()
    }
  }
  localFetchAllJobseekersByCampaignId(){
    if(this.props.allCampaigns && !this.props.jobseekersByCampaign){
      let allCampaignsToBeMapped = this.props.allCampaigns
      allCampaignsToBeMapped.map((campaign)=>{
        this.props.fetchAllJobseekersByCampaignId(campaign.campaign_id)
      })

    }
  }
  localNestJobseekersIntoCampaigns(){
    if(this.props.allCampaigns && this.props.jobseekersByCampaign){
    setTimeout(()=>{if(this.props.allCampaigns.length == 
      this.props.jobseekersByCampaign.length){
        if(!this.props.campaignsWithNestedJobseekers){
      this.props.nestJobseekersIntoCampaigns()}}}, 10)
    }
  }








  afterClickFetchAllJobseekersByCampaignId(){
    this.props.clearAllJobseekersState()
  }





  render() {
    console.log('rerendered')
    const cardStyle = {
      marginTop: "20px",
      backgroundColor: globalThemes.blueGrey400
    }
    this.localFetchAllJobseekersByCampaignId()
    //if(!this.props.campaignsWithNestedJobseekers){
      this.localNestJobseekersIntoCampaigns()
    //}
    return(
      <div style={{margin: '0 auto', backgroundColor: globalThemes.blueGrey500}}>



        {this.props.campaignsWithNestedJobseekers && this.props.campaignsWithNestedJobseekers.map((campaign)=>{


          return(
            <div>
              <Card style={cardStyle}>
                <CardHeader
                  style={{height: "110px", textAlign: "left", backgroundColor: globalThemes.blueGrey400, color: 'white'}}
                  actAsExpander={true}
                  showExpandableButton={true}
                  iconStyle={{position: "relative", left: "12px", color: 'white'}}
                >
                  <p style={{fontFamily: 'Poiret One', fontSize: "18px", margin: "-10px", marginTop: "-30px", padding: "0"}}><b>{campaign.campaign_name}</b></p>
                  <p style={{fontFamily: 'Mukta', fontSize: "15px", margin: "-15px", marginLeft: '0px', marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{campaign.location}</p>
                  <p style={{fontFamily: 'Mukta', fontSize: "15px", margin: "-15px", marginLeft: '0px', marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{campaign.job_type}</p>
                  <p style={{fontFamily: 'Mukta', fontSize: "15px", margin: "-15px", marginLeft: '0px', marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{campaign.salary + " " + campaign.salary_type}</p>
                  <p style={{fontFamily: "Mukta", fontSize: "15px", margin: "-15px", marginLeft: '0px', marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{campaign.job_start_date ? `Starting on ${campaign.job_start_date}` : "Starting on 13/07/2017"}</p>
                </CardHeader>

                <CardText expandable={true} style={{color: 'white', paddingBottom: "1px", paddingTop: "1px", backgroundColor: globalThemes.blueGrey400}}>

                  {campaign.jobseekers[0].map((jobseeker)=>{

                    return (
                      <Card style={{marginBottom: '10px', position: 'relative', backgroundColor: globalThemes.blueGrey300}}>
                        <CardHeader
                          style={{color: 'white', height: "90px", textAlign: "left", backgroundColor: globalThemes.blueGrey300}}
                          actAsExpander={true}
                          showExpandableButton={true}
                          iconStyle={{position: "relative", left: "12px", color: 'white'}}
                        >
                          <p style={{fontFamily: 'Poiret One', fontSize: "16px", margin: "-10px", marginTop: "-30px", padding: "0"}}><b>{jobseeker.first_name + ' ' + jobseeker.last_name}</b></p>
                          <p style={{fontFamily: globalFonts.Abel, fontSize: "13px", margin: "-10px", marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{jobseeker.postal_code}</p>
                          <p style={{fontFamily: globalFonts.Abel, fontSize: "13px", margin: "-10px", marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{'Age range ' + jobseeker.age}</p>
                          <p style={{fontFamily: globalFonts.Abel, fontSize: "13px", margin: "-10px", marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{jobseeker.email_id}</p>
                          <p style={{fontFamily: globalFonts.Abel, fontSize: "13px", margin: "-10px", marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{jobseeker.contact_no}</p>
                        </CardHeader>

                        {jobseeker.job_status == 'applied' ? 
                        <div>
                        {console.log(jobseeker.job_status)}
                        <Checkbox
                          disableTouchRipple
                          checkedIcon={<ActionFavorite color='red' />}
                          uncheckedIcon={<ActionFavoriteBorder color='red' />}

                          onCheck={() => {
                            jobseeker.job_status = 'selected'
                            this.afterClickFetchAllJobseekersByCampaignId()
                            this.props.updateJobseekerJobStatus(jobseeker)
                          }}

                          style={{position: 'absolute', top:'0px', left: 'calc(100% - 40px)', float: 'right'}}
                        /> 
                        </div>
                        :
                        <div>
                        <Checkbox
                          disableTouchRipple
                          checkedIcon={<ActionFavorite/>}
                          uncheckedIcon={<ActionFavoriteBorder color={yellow500}/>}
                          checked={true}

                          style={{position: 'absolute', top:'0px', left: 'calc(100% - 40px)', float: 'right'}}
                        />
                        </div>
                        }



                      </Card>
                    )})
                  }
                </CardText>
            </Card>
            </div>
        )
      })}
      </div>
    )
  }
}



function mapStateToProps(state) {
  return {
    allCampaigns: state.main.allCampaigns,
    jobseekersByCampaign: state.main.jobseekersByCampaign,
    campaignsWithNestedJobseekers: state.main.campaignsWithNestedJobseekers
  };
}

export default connect(mapStateToProps, { fetchAllCampaigns , 
  fetchAllJobseekersByCampaignId, nestJobseekersIntoCampaigns, 
  updateJobseekerJobStatus, clearAllJobseekersState})(ApplicantsTabParent)