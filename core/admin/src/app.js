import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createStore from './store/createStore'
import reducers from './reducers'

import Routes from './Routes.js'
import './styles/main.scss'

const store = createStore(reducers, browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Routes history={history} store={store} />,
  document.getElementById('root')
)