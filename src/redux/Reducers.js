import { combineReducers } from 'redux'
import SearchComponentReducer from './SearchComponentReducer'
import ListComponentReducer from './ListComponentReducer'

const reducers = combineReducers({
  SearchComponentReducer,
  ListComponentReducer
})

export default reducers