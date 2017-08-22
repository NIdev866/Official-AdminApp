import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

//NO NEED FOR REDUCERS AT ALL

const rootReducer = combineReducers({
  form: formReducer
});

export default rootReducer;
