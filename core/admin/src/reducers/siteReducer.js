import {push} from 'react-router-redux'
import {
  LIST_SITES_START,
  LIST_SITES_SUCCESS,
  LIST_SITES_ERROR,
  GET_SITE_START,
  GET_SITE_SUCCESS,
  GET_SITE_ERROR,
  SITE_DELETE_SUCCESS
} from '../actions/siteActions'

const initialState = {
  sitesList: {
    sites: [],
    error: null,
    loading: true
  },
  showSite: {
    title: '',
    url: '',
    description: '',
    approvedUsers: [],
    loading: true
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    // List Sites
    case LIST_SITES_START:
      return Object.assign({}, state, {
        sitesList: Object.assign({}, state.sitesList, {
          loading: true
        })
      })
    case LIST_SITES_SUCCESS:
      return Object.assign({}, state, {
        sitesList: Object.assign({}, state.sitesList, {
          sites: action.data,
          loading: false
        })
      })
    case LIST_SITES_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        loading: false
      })
    
    case GET_SITE_START:
      return Object.assign({}, state, {
        showSite: Object.assign({}, state.showSite, {
          loading: true
        })
      })
    case GET_SITE_SUCCESS:
      return Object.assign({}, state, {
        showSite: Object.assign({}, state.showSite, {
          ...action.data,
          loading: false
        })
      })
    case GET_SITE_ERROR:
      return Object.assign({}, state, {
        showSite: Object.assign({}, state.showSite, {
          error: action.error,
          loading: false
        })
      })
    
    //Create case for site delete
    
    default:
      return state
  }
}