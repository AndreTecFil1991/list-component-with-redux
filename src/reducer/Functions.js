//##################################################################################################################################
//############### ListComponent functions #########################################################################################
//################################################################################################################################

// AUX functions ################################################################################################################
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
//###############################################################################################################################

export function fillSearchStateInfo(state) {
    let search = state.search;
    const products = state.products.sort((a, b) => {
        return a.votes - b.votes
    })

    const votesFrom = products[0].votes;
    const votesTo = products[products.length - 1].votes;

    //1st object empty to allow searches without selection
    let submittedByToShow = [
        {
            username: '-- select an option --',
            userimage: ''
        }
    ];

    for (let i = 0; i < products.length; i++) {
        submittedByToShow = processSubmittedBy(submittedByToShow, products[i].submitterAvatarUrl);
    }

    search.votesFrom = votesFrom;
    search.votesTo = votesTo;
    search.submittedByToShow = submittedByToShow;

    Object.assign({}, state, { search });
}

export function handleProductVote(productID, voteType, state) {
    let products = state.products;
    let lastUpvoted = state.lastUpvoted;
    let lastDownvoted = state.lastDownvoted;
    products.find(product => {
        if (product.id === productID) {
            if (voteType === "up") {
                Object.assign({}, product, { votes: product.votes++ });
                lastUpvoted = processVote(lastUpvoted, product);
            }
            else {
                Object.assign({}, product, { votes: product.votes-- });
                lastDownvoted = processVote(lastDownvoted, product);
            }
        }
    });
}

export function changeSort(sortType, state) {
    let localState = state
    localState.sort = sortType
    Object.assign({}, state, localState);
}
//################################################################################################################################
//#################################################################################################################################
//##################################################################################################################################


//##################################################################################################################################
//############### SearchComponent functions #######################################################################################
//################################################################################################################################

// AUX functions ################################################################################################################
function parseUsername(user) {
    let username = '';
    //split to have the image name
    const firstSplit = user.split('/');
    //split to have only the username
    const secondSplit = firstSplit[firstSplit.length - 1].split('.');

    if (secondSplit.length > 0) {
        let usernameAux = secondSplit[0];
        username = usernameAux[0].toUpperCase();

        for (let i = 1; i < usernameAux.length; i++)
            username += usernameAux[i];
    }

    return username;
}

function processSubmittedBy(submittedByToShow, user) {
    let updated = false;

    if (submittedByToShow.length > 0) {
        submittedByToShow.find(submittedBy => {
            if (submittedBy.userimage === user) {
                updated = true;
            }
        });
    }

    if (!updated || submittedByToShow.length === 0) {
        submittedByToShow.push({
            username: parseUsername(user),
            userimage: user
        });
    }

    return submittedByToShow;
}

function filterByVotes(products, votesFrom, votesTo) {
    let filteredProducts = [];

    if (votesFrom.length === 0 && votesTo.length === 0)
        return products;

    products.find(product => {
        if ((votesFrom.length === 0 && product.votes <= votesTo) || (product.votes >= votesFrom && votesTo.length === 0) || (product.votes >= votesFrom && product.votes <= votesTo))
            filteredProducts.push(product);
    });

    return filteredProducts;
}

function filterByTitle(products, title) {
    let filteredProducts = [];

    if (title.length === 0)
        return products;

    products.find(product => {
        if (product.title.toUpperCase().indexOf(title.toUpperCase()) > -1)
            filteredProducts.push(product);
    });

    return filteredProducts;
}

function filterBySubmittedBy(products, submittedBy) {
    let filteredProducts = [];

    products.find(product => {
        if (product.submitterAvatarUrl.toUpperCase().indexOf(submittedBy.toUpperCase()) > -1)
            filteredProducts.push(product);
    })

    return filteredProducts;
}
//###############################################################################################################################

export function doSearch(search, state) {
    let localState = state
    let products = localState.productsBackup
    const votesFrom = search.votesFrom
    const votesTo = search.votesTo
    const title = search.title
    const submittedBy = search.submittedBy

    let filteredProducts = []

    if (search.votesFrom || search.votesTo) {
        filteredProducts = filterByVotes(products, votesFrom, votesTo);
        products = filteredProducts;
    }

    if (title.length > 0) {
        filteredProducts = filterByTitle(products, title);
        products = filteredProducts;
    }

    if (submittedBy.indexOf('--') === -1) {
        filteredProducts = filterBySubmittedBy(products, submittedBy);
    }
    localState.products = filteredProducts
    Object.assign({}, state, localState);
}

export function resetSearch(state) {
    let localState = state
    localState.products = localState.productsBackup
    Object.assign({}, state, localState);
}
//################################################################################################################################
//#################################################################################################################################
//##################################################################################################################################