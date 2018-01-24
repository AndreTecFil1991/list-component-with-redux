import { doSearch, resetSearch, fillSearchStateInfo, handleProductVote, changeSort } from './Functions'

export default function reducer(state, action) {
  switch (action.type) {
    //SearchComponent
    case 'DO_SEARCH':
      doSearch(action.search, state)
      return state
    case 'RESET_SEARCH':
      resetSearch(state)
      return state
    //ListComponent
    case 'HANDLE_PRODUCT_VOTE':
      handleProductVote(action.productID, action.voteType, state)
      return state
    case 'CHANGE_SORT':
      changeSort(action.sortType, state)
      return state
    case 'FILL_SEARCH_STATE_INFO':
      fillSearchStateInfo(state)
      return state
    default:
      return state
  }
}
