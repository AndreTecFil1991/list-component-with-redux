import { connect } from 'react-redux'
import App from './App'
import { handleProductVote, changeSort, fillSearchStateInfo, doSearch, resetSearch } from './actions'

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => {
    return {
        handleProductVote: (productID, type) => {
            dispatch(handleProductVote(productID, type))
        },
        changeSort: type => {
            dispatch(changeSort(type))
        },
        fillSearchStateInfo: () => {
            dispatch(fillSearchStateInfo())
        },
        doSearch: search => {
            dispatch(doSearch(search))
        },
        resetSearch: () => {
            dispatch(resetSearch())
        }
    }
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default AppContainer