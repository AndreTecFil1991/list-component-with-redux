import { combineReducers } from 'redux'
import SearchComponentReducer from './SearchComponentReducer'
import VotingComponentReducer from './VotingComponentReducer'
import ListComponentReducer from './ListComponentReducer'

export const reducers = combineReducers({
  SearchComponentReducer,
  ListComponentReducer
})