import './style/style.css';
import registerServiceWorker from './registerServiceWorker';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware ,compose} from 'redux';
import { BrowserRouter, Route , Switch} from 'react-router-dom';
import promise from 'redux-promise';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'



import reducers from './reducers';
import HomeComponent from './components/Home';
import RegisterComponent from './components/Register';
import CreateCampaign from './components/CreateCampaign';
import CampaignDetails from './components/CampaignDetails';
import ListCampaigns from './components/ListCampaigns';

import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
// react-tap-event-plugin provides onTouchTap() to all React Components.
// It's a mobile-friendly onClick()
// alternative for components in Material-UI,
// especially useful for the buttons.

//const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(promise)
  ));


ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/create-campaign" component={CreateCampaign} />
            <Route path="/register" component={RegisterComponent} />
            <Route exact={true} path="/" component={HomeComponent} />
          </Switch>
          <Route path="/campaigns/:id" component={CampaignDetails} />
          <Route path="/campaigns" component={ListCampaigns} />
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
