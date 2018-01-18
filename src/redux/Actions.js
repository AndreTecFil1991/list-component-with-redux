let nextTodoId = 0
//########################################################
//### ListComponent actions ############################
//####################################################
export const handleProductVote = (productID, type) => {
    return {
        action: 'HANDLE_PRODUCT_VOTE',
        productID,
        type
    }
}

export const changeSort = type => {
    return {
        action: 'CHANGE_SORT',
        type
    }
}
//########################################################
//### SearchComponent actions ##########################
//####################################################
export const parseUsername = user => {
    return {
        action: 'PARSE_USERNAME',
        user
    }
}

export const processSubmittedBy = (submittedByToShow, user) => {
    return {
        action: 'PROCESS_SUBMITTED_BY',
        submittedByToShow,
        user
    }
}

export const fillSearchStateInfo = () => {
    return {
        action: 'FILL_SEARCH_STATE_INFO'
    }
}

export const filterByVotes = (products, votesFrom, votesTo) => {
    return {
        action: 'FILTER_BY_VOTES',
        products,
        votesFrom,
        votesTo
    }
}

export const filterByTitle = (products, title) => {
    return {
        action: 'FILTER_BY_TITLE',
        products,
        title
    }
}

export const filterBySubmittedBy = (products, submittedBy) => {
    return {
        action: 'FILTER_BY_SUBMITTED_BY',
        products,
        submittedBy
    }
}

export const doSearch = search => {
    return {
        action: 'DO_SEARCH',
        search
    }
}

export const resetSearch = () => {
    return {
        action: 'RESET_SEARCH'
    }
}
