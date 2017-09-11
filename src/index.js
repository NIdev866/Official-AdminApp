import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware ,compose} from 'redux';
import { BrowserRouter, Route , Switch, Redirect} from 'react-router-dom';
import promise from 'redux-promise';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import reducers from './reducers';
import JobseekerParent from './jobseekerApp/jobseekerParent';
import injectTapEventPlugin from 'react-tap-event-plugin'
import CreateCampaignParent from "./createCampaignApp/createCampaignParent"
import WorkerParent from "./workerApp/workerParent"
import Progress from "./workerApp/components/progress"
import Myprofile from "./workerApp/components/myprofile"
import Jobs from "./workerApp/components/jobs"
import AddAdminParent from "./addAdminApp/addAdminParent"
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

injectTapEventPlugin();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(promise)
  ));

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'https://mgtxod3y5k.execute-api.eu-west-1.amazonaws.com/stage2/graphql'}),
  dataIdFromObject: o => o.id
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <MuiThemeProvider>
        <BrowserRouter>
          <div>
            <Route path="/addadmin" component={AddAdminParent} />
            <Route path="/createcampaign" component={CreateCampaignParent} />
            <Route path="/jobseeker" component={JobseekerParent} />
            <Route path="/worker" component={WorkerParent} />
            <Route path="/worker/progress" component={Progress}/>
            <Route path="/worker/jobs" component={Jobs}/>
            <Route path="/worker/myprofile" component={Myprofile}/>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  </ApolloProvider>
  , document.getElementById('root'));
