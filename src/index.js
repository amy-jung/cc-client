import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './components/wrappers.js'
import getWeb3 from './utils/web3/getWeb3'

import App from './App'
import Home from './pages/UnAuth/Home'
import Login from './pages/UnAuth/Login'
import Profile from './pages/Auth/Profile'
import Inbox from './pages/Auth/Inbox'
import Upload from './pages/Auth/Upload'

import Store from './utils/redux/Store'

const history = syncHistoryWithStore(browserHistory, Store)

getWeb3
.then(results => {
  console.log('Web3 initialized!')
})
.catch(() => {
  console.log('Error in web3 initialization.')
})

ReactDOM.render((
    <Provider store={Store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="profile" component={UserIsAuthenticated(Profile)} />
          <Route path="inbox" component={UserIsAuthenticated(Inbox)} />
          <Route path="upload" component={UserIsAuthenticated(Upload)} />
          <Route path="login" component={UserIsNotAuthenticated(Login)} />
          {/* <Route path="login" component={UserIsNotAuthenticated(Login)} /> */}
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)

// register
// inbox
// gallery
// gallery/id
// user-id/gallery
