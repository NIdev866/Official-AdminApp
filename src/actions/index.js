import axios from 'axios';

export const REGISTER_JOBSEEKER = 'register_jobseeker';
export const FETCH_CAMPAIGNS = 'fetch_campaigns';
export const FETCH_CAMPAIGN = 'fetch_campaign';
export const SELECT_CAMPAIGN = 'select_campaign';

export function registerJobseeker(Form_data){

  return{
    type: REGISTER_JOBSEEKER,
    payload: Form_data
  }
}

export function fetchCampaigns(){

  const req = axios.get('http://localhost:3004/campaigns');
                   //.then(console.log(req));

  return{
    type: FETCH_CAMPAIGNS,
    payload: req
  }
}

export function fetchCampaign(id){
  const req = axios.get(`http://localhost:3004/campaigns/${id}`);
  return {
    type: FETCH_CAMPAIGN,
    payload: req
  };
}

export function selectCampaign(id){
  console.log(`from action ${id}`);
  return {
    type: SELECT_CAMPAIGN,
    payload: id
  };
}
