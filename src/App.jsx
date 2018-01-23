import React, { Component } from 'react'
import styled from 'react-emotion'
import { createStore } from 'redux'

import ListComponent from './components/listcomponent/ListComponent'
import VotingComponent from './components/votingcomponent/VotingComponent'
import SearchComponent from './components/searchcomponent/SearchComponent'

import products from './js/MockData.js'

//################################################################################################################################################################
//########## REDUX ##############################################################################################################################################
//##############################################################################################################################################################
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

function handleProductVote(productID, voteType, state) {
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

  return {
    products,
    lastUpvoted,
    lastDownvoted
  };
}

function changeSort(sortType) {
  return { sort: sortType }
}

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
    submittedByToShow = processSubmittedBy(submittedByToShow, products[i].submitterAvatarUrl);
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

  return {
    products: filteredProducts
  }
}

function resetSearch(state) {
  return {
    products: state.productsBackup
  }
}

function reducer(state, action) {
  let result = '';
  switch (action.type) {
    //SearchComponent
    case 'DO_SEARCH':
      result = doSearch(action.search, state)
      return result
    case 'RESET_SEARCH':
      result = resetSearch(state)
      return result
    case 'FILL_SEARCH_STATE_INFO':
      result = fillSearchStateInfo(state)
      return result
    //ListComponent
    case 'HANDLE_PRODUCT_VOTE':
      result = handleProductVote(action.productID, action.voteType, state)
      return result
    case 'CHANGE_SORT':
      result = changeSort(action.sortType)
      return result
    default:
      return state
  }
}

const initialState = {
  products: products,
  productsBackup: products,
  sort: 'asc',
  lastUpvoted: [],
  lastDownvoted: [],
  search: {
    votesFrom: 0,
    votesTo: 0,
    title: '',
    submittedBy: '',
    submittedByToShow: []
  }
};

export const store = createStore(reducer, initialState);

const listener = () => {
  console.log('Current state: ', store.getState());
}
store.subscribe(listener);

//##############################################################################################################################################################
//###############################################################################################################################################################
//################################################################################################################################################################

export class App extends Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());

    store.dispatch({
      type: 'FILL_SEARCH_STATE_INFO'
    })
  }

  render() {
    //CSS with emotion
    const LeftContainer = styled('div') `
      margin-right: 10px;
      @media (min-width: 720px) {
        float: left;
        width: 60%;        
      }
      @media (max-width: 720px) {
        width: 100%;
      }
    `

    const RightContainer = styled('div') `
      margin-left: 10px;
      @media (min-width: 720px) {
        width: 30%;        
      }
      @media (max-width: 720px) {
        display: none;
      }
    `

    const Container = styled('div') `
      margin: 30px;
      @media (min-width: 720px) {
        width: 100%;
      }
      @media (max-width: 720px) {
        margin: 0 10%;
        width: 80%;
      }
    `

    const H1 = styled('h1') `
      text-align: center;
      padding-bottom: 0.21428571rem;
      top: 0;
      border-bottom: 1px solid rgba(34, 36, 38, 0.15);
      padding-top: 20px;
    `

    //titles for VotingComponent continers
    const votingComponentConfig = [
      {
        title: 'Last upvoted',
        votes: store.getState().lastUpvoted
      }, {
        title: 'Last downvoted',
        votes: store.getState().lastDownvoted
      }
    ]

    return (
      <div>
        <H1>Items list</H1>
        <Container>
          <LeftContainer>
            <SearchComponent />
            <ListComponent />
          </LeftContainer>
          <RightContainer>
            <VotingComponent
              config={votingComponentConfig}
            />
          </RightContainer>
        </Container>
      </div>
    );
  }
}

/*<SearchComponent
              votesFrom={store.getState().votesFrom}
              votesTo={store.getState().votesTo}
              submittedByToShow={store.getState().submittedByToShow}
              resetSearch={resetSearch}
              doSearch={doSearch}
            />
            <ListComponent
              sort={store.getState().sort}
              products={store.getState().products}
              changeSort={changeSort}
              handleProductVote={handleProductVote}
            />*/