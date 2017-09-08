import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware ,compose} from 'redux';
import { BrowserRouter, Route , Switch, Redirect} from 'react-router-dom';
import promise from 'redux-promise';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import reducers from './reducers';
import JobseekerRegisterParent from './jobseekerRegisterApp/jobseekerRegisterParent';
import injectTapEventPlugin from 'react-tap-event-plugin'
import AdminParent from "./adminApp/AdminParent"
import ProfileParent from "./profileApp/profileParent"
import Progress from "./profileApp/components/progress"
import Myprofile from "./profileApp/components/myprofile"
import Jobs from "./profileApp/components/jobs"

injectTapEventPlugin();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(promise)
  ));

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <BrowserRouter>
        <div>
          <Route path="/admin" component={AdminParent} />
          <Route path="/register" component={JobseekerRegisterParent} />
          <Route path="/profile" component={ProfileParent} />
          <Route path="/profile/progress" component={Progress}/>
          <Route path="/profile/jobs" component={Jobs}/>
          <Route path="/profile/myprofile" component={Myprofile}/>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
  , document.getElementById('root'));
