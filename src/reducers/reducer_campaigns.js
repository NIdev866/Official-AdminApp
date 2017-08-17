import _ from 'lodash';
import { FETCH_CAMPAIGNS,
         FETCH_CAMPAIGN,
         SELECT_CAMPAIGN
        } from '../actions';


export default function(state={}, action){
  switch (action.type) {
    case FETCH_CAMPAIGNS:
      return _.mapKeys(action.payload.data,'id');
    case FETCH_CAMPAIGN:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case SELECT_CAMPAIGN:
      const arrayOfSelectedCampaigns = [];
      arrayOfSelectedCampaigns.push(action.payload);
      //arrayOfSelectedCampaigns.map(id=>console.log(`from reducer ${id}`));
      return {...state, selectedCampaigns:arrayOfSelectedCampaigns};
    default: return state;

  }
}
