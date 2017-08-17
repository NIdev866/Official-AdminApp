
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCampaign, selectCampaign } from '../actions';


class CampaignDetails extends Component {

  componentDidMount(){
    const { id } = this.props.match.params;//GET id OUT OF URL
    this.props.fetchCampaign(id);
  }

  selectedCampaign(){
    this.props.selectCampaign(this.refs.check_me.value);
  }


  render(){

    const { campaign } = this.props;

    return(
      campaign
          ? <div className='z9000'>
              <Link to='/'>Back To Index</Link>
              <h3>{campaign.title}{this.props.match.params.id}</h3>
              <h6>Job Description: {campaign.salary}</h6>
              <p>{campaign.description}</p>
              <input
                ref="check_me"
                onChange={this.selectedCampaign.bind(this)}
                type="checkbox"
                name="selectcampaign"
                value={campaign.id} />
              <Link to='/register'>APPLY</Link>
            </div>
          : <div>Loading...</div>
    );
  }
}

function mapStateToProps({ campaigns }, ownProps){
  return { campaign: campaigns[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchCampaign, selectCampaign })(CampaignDetails);
