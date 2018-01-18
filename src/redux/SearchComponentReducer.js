const SearchComponentReducer = function reducer(state, action) {
    if (action.type === 'ADD_MESSAGE') {
      return {
        votes: state.votes.concat(action.message)
      }
    } else if (action.type === 'DELETE_VOTE') {
      return {
        votes: [
          ...state.votes.slice(0, action.index),
          ...state.votes.slice(action.index + 1, state.votes.length)
        ]
      }
    } else {
      return state;
    }
  }
  
export default SearchComponentReducer;