import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import CampaignsReducer from './reducer_campaigns';
//import SelectedCampaigns from './reducer_selector';


//STORAGE OBJECT
const rootReducer = combineReducers({
  campaigns: CampaignsReducer,
  //selectedCampaigns: SelectedCampaigns,
  form: formReducer
});

export default rootReducer;
