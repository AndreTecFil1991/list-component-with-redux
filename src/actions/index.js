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
export const fillSearchStateInfo = () => {
    return {
        action: 'FILL_SEARCH_STATE_INFO'
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
