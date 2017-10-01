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
    }
    this.localFetchAllJobseekersByCampaignId()
    //if(!this.props.campaignsWithNestedJobseekers){
      this.localNestJobseekersIntoCampaigns()
    //}
    return(
      <div style={{margin: '0 auto'}}>



        {this.props.campaignsWithNestedJobseekers && this.props.campaignsWithNestedJobseekers.map((campaign)=>{


          return(
            <div>
              <Card style={cardStyle}>
                <CardHeader
                  style={{height: "110px", textAlign: "left"}}
                  actAsExpander={true}
                  showExpandableButton={true}
                  iconStyle={{position: "relative", left: "12px"}}
                >
                  <p style={{fontSize: "18px", margin: "-10px", marginTop: "-30px", padding: "0"}}><b>{campaign.campaign_name}</b></p>
                  <p style={{fontSize: "15px", margin: "-10px", marginTop: "10px", padding: "0", color: "grey"}}>{campaign.location}</p>
                  <p style={{fontSize: "15px", margin: "-10px", marginTop: "10px", padding: "0", color: "grey"}}>{campaign.job_type}</p>
                  <p style={{fontSize: "15px", margin: "-10px", marginTop: "10px", padding: "0", color: "grey"}}>{campaign.salary + " " + campaign.salary_type}</p>
                  <p style={{fontSize: "15px", margin: "-10px", marginTop: "10px", padding: "0", color: "grey"}}>{campaign.job_start_date ? `Starting on ${campaign.job_start_date}` : "Starting on 13/07/2017"}</p>
                </CardHeader>

                <CardText expandable={true} style={{paddingBottom: "1px", paddingTop: "1px"}}>

                  {campaign.jobseekers[0].map((jobseeker)=>{

                    return (
                      <Card style={{marginBottom: '10px', position: 'relative'}}>
                        <CardHeader
                          style={{height: "90px", textAlign: "left"}}
                          actAsExpander={true}
                          showExpandableButton={true}
                          iconStyle={{position: "relative", left: "12px"}}
                        >
                          <p style={{fontSize: "16px", margin: "-10px", marginTop: "-30px", padding: "0"}}><b>{jobseeker.first_name + ' ' + jobseeker.last_name}</b></p>
                          <p style={{fontSize: "13px", margin: "-10px", marginTop: "10px", padding: "0", color: "grey"}}>{jobseeker.postal_code}</p>
                          <p style={{fontSize: "13px", margin: "-10px", marginTop: "10px", padding: "0", color: "grey"}}>{'Age range ' + jobseeker.age}</p>
                          <p style={{fontSize: "13px", margin: "-10px", marginTop: "10px", padding: "0", color: "grey"}}>{jobseeker.email_id}</p>
                          <p style={{fontSize: "13px", margin: "-10px", marginTop: "10px", padding: "0", color: "grey"}}>{jobseeker.contact_no}</p>
                        </CardHeader>

                        {jobseeker.job_status == 'applied' ? 
                        <div>
                        {console.log(jobseeker.job_status)}
                        <Checkbox
                          disableTouchRipple
                          checkedIcon={<ActionFavorite />}
                          uncheckedIcon={<ActionFavoriteBorder />}

                          onCheck={() => {
                            this.afterClickFetchAllJobseekersByCampaignId()
                            this.props.updateJobseekerJobStatus(jobseeker)
                          }}

                          style={{position: 'absolute', top:'0px', left: 'calc(100% - 40px)', float: 'right'}}
                        /> 
                        </div>
                        :
                        <div>
                        {console.log('HUU ' + jobseeker.job_status)}
                        <Checkbox
                          disableTouchRipple
                          checkedIcon={<ActionFavorite />}
                          uncheckedIcon={<ActionFavoriteBorder />}

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