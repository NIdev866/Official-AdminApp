import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import mainReducer from './mainReducer';
import authReducer from './auth_reducer';


const rootReducer = combineReducers({
  form: formReducer,
  main: mainReducer,
  auth: authReducer
});

export default rootReducer;
