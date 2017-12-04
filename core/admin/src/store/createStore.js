import configStore from './configStore'

export default function createStore(reducers, browserHistory) {
  return configStore(browserHistory)(reducers)
}