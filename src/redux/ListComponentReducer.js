function processVote(votes, product) {
    let updated = false;

    if (votes.length > 0) {
        votes.find(voted => {
            if (voted.id === product.id) {
                Object.assign({}, voted, { counter: voted.counter++ });
                updated = true;
            }
        });
    }

    if (!updated || votes.length === 0) {
        votes.push({
            id: product.id,
            title: product.title,
            counter: 1
        });
    }

    return votes;
}

function handleProductVote(productID, type, state) {
    let products = state.products;
    let lastUpvoted = state.lastUpvoted;
    let lastDownvoted = state.lastDownvoted;
    products.find(product => {
        if (product.id === productID) {
            if (type === "up") {
                Object.assign({}, product, { votes: product.votes++ });
                lastUpvoted = this.processVote(lastUpvoted, product);
            }
            else {
                Object.assign({}, product, { votes: product.votes-- });
                lastDownvoted = this.processVote(lastDownvoted, product);
            }
        }
    });

    return {
        products,
        lastUpvoted,
        lastDownvoted
    };
}

function changeSort(type) {
    return { sort: type }
}


const ListComponentReducer = function reducer(state = [], action) {
    switch (action.type) {
        case 'HANDLE_PRODUCT_VOTE':
            const result = this.handleProductVote(action.productID, action.type, state);

            return [
                ...state,
                result
            ]
        case 'CHANGE_SORT':
            const result = this.changeSort(action.type);

            return [
                ...state,
                result
            ]
        default:
            return state
    }
}

export default ListComponentReducer;