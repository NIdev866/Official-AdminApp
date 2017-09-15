import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware ,compose} from 'redux';
import { BrowserRouter, Route , Switch, Redirect } from 'react-router-dom';
import promise from 'redux-promise';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import reducers from './reducers';
import JobseekerParent from './jobseekerApp/jobseekerParent';
import injectTapEventPlugin from 'react-tap-event-plugin'
import WorkerParent from "./workerApp/workerParent"
import Progress from "./workerApp/components/progress"
import Myprofile from "./workerApp/components/myprofile"
import Jobs from "./workerApp/components/jobs"
import reduxThunk from 'redux-thunk';

import AdminParent from "./adminApp/adminParent"
import AdminSignin from "./adminApp/adminSignin"
import AdminSignout from "./adminApp/adminSignout"
import AdminSignup from "./adminApp/adminSignup"
import { AUTH_USER } from './actions/types';

injectTapEventPlugin();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(reduxThunk, promise)
  ));


const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <BrowserRouter>
        <div>

          <Route path="/admin" component={AdminParent} />
          <Route path="/admin/signout" component={AdminSignout} />
          <Route path="/admin/signup" component={AdminSignup} />
          <Route path="/admin/signin" component={AdminSignin} />

          <Route path="/jobseeker" component={JobseekerParent} />
          <Route path="/worker" component={WorkerParent} />
          <Route path="/worker/progress" component={Progress}/>
          <Route path="/worker/jobs" component={Jobs}/>
          <Route path="/worker/myprofile" component={Myprofile}/>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
  , document.getElementById('root'));


/*           BACKUP:

          <Route path="/adminauth" component={AdminAuthParent} />
          <Route path="/adminauth/signin" component={AdminAuthParent} />
          <Route path="/adminauth/signout" component={AdminAuthParent} />
          <Route path="/adminauth/signup" component={AdminAuthParent} />
*/