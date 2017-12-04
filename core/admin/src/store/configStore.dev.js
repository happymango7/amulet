import thunkMiddleware from 'redux-thunk'
import {createStore, compose, applyMiddleware} from 'redux'
import {routerMiddleware} from 'react-router-redux'

export default function create(browserHistory) {
  return compose(
    applyMiddleware(thunkMiddleware, routerMiddleware(browserHistory)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)
}