import React, { Component } from 'react'
import config from './config'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'

import App from './containers/App'

import Dashboard from './containers/Dashboard'
import SiteEdit from './containers/Site/SiteEdit.js'
import Reports from './containers/Reports'

class Routes extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={this.props.history}>
          <Route path="/" component={App}>
            <IndexRoute component={Dashboard} />
            <Route path="/site/new" component={SiteEdit} />
            <Route path="/site/:id" component={SiteEdit} />
            <Route path="/reports" component={Reports} />
          </Route>
        </Router>
      </Provider>
    )
  }
}

export default Routes