import config from '../config'
import { push } from 'react-router-redux'


const apiUrl = config.api.url

// List all sites
export const LIST_SITES_START = 'LIST_SITES_START'
export const LIST_SITES_SUCCESS = 'LIST_SITES_SUCCES'
export const LIST_SITES_ERROR = 'LIST_SITES_ERROR'

export function sitesListStart(data) {
  return { type: LIST_SITES_START, data }
}

export function sitesListSuccess(data) {
  return { type: LIST_SITES_SUCCESS, data }
}

export function sitesListError(data) {
  return { type: LIST_SITES_ERROR, data }
}

export function listSites() {
  return (dispatch) => {
    dispatch(sitesListStart())
    fetch(`${apiUrl}/listSites`)
    .then(res => res.json())
    .then(json => {
      dispatch(sitesListSuccess(json))
    })
    .catch(error => {
      dispatch(sitesListError)
    })
  }
}

// Create & Edit Sites
export const CREATE_SITE_START = 'CREATE_SITE_START'
export const CREATE_SITE_SUCESS = 'CREATE_SITE_SUCCESS'
export const CREATE_SITE_ERROR = 'CREATE_SITE_ERROR'

export function siteCreateStart(data) {
  return { type: CREATE_SITE_START, data}
}

export function siteCreateSuccess(data) {
  return { type: CREATE_SITE_SUCCESS, data}
}

export function siteCreateError(error) {
  return { type: CREATE_SITE_ERROR, error}
}

export function createSite(data) {
  return (dispatch) => {
    dispatch(siteCreateStart())
    fetch(`${apiUrl}/createSite`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
      dispatch(push('/'))
      dispatch(siteCreateSuccess())
    })
    .catch(error => {
      dispatch(siteCreateError())
    })

  }
}

// Get Single Site
export const GET_SITE_START = 'GET_SITE_START'
export const GET_SITE_SUCCESS = 'GET_SITE_SUCCESS'
export const GET_SITE_ERROR = 'GET_SITE_ERROR'

export function getSiteStart(data) {
  return { type: GET_SITE_START, data}
}

export function getSiteSuccess(data) {
  return { type: GET_SITE_SUCCESS, data}
}

export function getSiteError(error) {
  return { type: GET_SITE_ERROR, error}
}

export function getSite(id) {
  return (dispatch) => {
    dispatch(getSiteStart())
    fetch(`${apiUrl}/getSite/${id}`)
    .then(res => res.json())
    .then(json => {
      dispatch(getSiteSuccess(json))
    })
    .catch(error => {
      dispatch(getSiteError())
    })
  }
}

// Edit Site



// Delete Site

export const SITE_DELETE_SUCCESS = 'SITE_DELETE_SUCCESS'

export function siteDeleteSuccess(data) {
  return { type: SITE_DELETE_SUCCESS, data}
}

export function deleteSite(id) {
  return (dispatch) => {
    fetch(`${apiUrl}/deleteSite/${id}`, {
      method: 'delete'
    })
    .then(res => res.json())
    .then(json => {
      dispatch(push('/'))
      dispatch(siteDeleteSuccess())
    })
    .catch(err => {
      console.error(err)
    })
  }
}




