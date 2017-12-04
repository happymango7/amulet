import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'
import siteReducer from './siteReducer'

const reducers = combineReducers({
  sites: siteReducer,
  form: formReducer,
  routing: routerReducer
})

export default reducers