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
      username: this.parseUsername(user),
      userimage: user
    });
  }

  return submittedByToShow;
}

function fillSearchStateInfo(state) {
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
    submittedByToShow = this.processSubmittedBy(submittedByToShow, products[i].submitterAvatarUrl);
  }

  return {
    search: {
      votesFrom,
      votesTo,
      submittedByToShow
    }
  }
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

function doSearch(search, state) {
  let products = state.productsBackup;
  const votesFrom = search.votesFrom;
  const votesTo = search.votesTo;
  const title = search.title;
  const submittedBy = search.submittedBy;

  let filteredProducts = [];

  if (search.votesFrom || search.votesTo) {
    filteredProducts = this.filterByVotes(products, votesFrom, votesTo);
    products = filteredProducts;
  }

  if (title.length > 0) {
    filteredProducts = this.filterByTitle(products, title);
    products = filteredProducts;
  }

  if (submittedBy.indexOf('--') === -1) {
    filteredProducts = this.filterBySubmittedBy(products, submittedBy);
  }

  return {
    products: filteredProducts
  }
}

function resetSearch(state) {
  return {
    products: state.productsBackup
  }
}

const SearchComponentReducer = function reducer(state = [], action) {
  switch (action.type) {
    case 'DO_SEARCH':
      return [
        ...state,
        this.doSearch(action.search, state)
      ]
    case 'RESET_SEARCH':
      return [
        ...state,
        this.resetSearch(state)
      ]
    case 'FILL_SEARCH_STATE_INFO':
    return [
      ...state,
      this.fillSearchStateInfo(state)
    ]    
    default:
      return state
  }
}

export default SearchComponentReducer;