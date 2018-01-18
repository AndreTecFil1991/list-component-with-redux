import React, { Component } from 'react'
import styled from 'react-emotion'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import products from './js/MockData.js'
import ListComponent from './listcomponent/ListComponent'
import VotingComponent from './votingcomponent/VotingComponent'
import SearchComponent from './searchcomponent/SearchComponent'
import reducers from './redux/Reducers'

//################################################################################################################################################################
//########## REDUX ##############################################################################################################################################
//##############################################################################################################################################################

/*handleSubmit = () => {
  store.dispatch({
      type: 'ADD_MESSAGE',
      message: this.state.value
  })
}*/

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

let store = createStore(reducers, initialState);

const listener = () => {
  console.log('Current state: ', store.getState().votes);
}
store.subscribe(listener);


//##############################################################################################################################################################
//###############################################################################################################################################################
//################################################################################################################################################################

class App extends Component {
  constructor(props) {
    super(props);
    //functions scope bind
    this.handleProductVote = this.handleProductVote.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.processVote = this.processVote.bind(this);
    this.fillSearchStateInfo = this.fillSearchStateInfo.bind(this);
    this.parseUsername = this.parseUsername.bind(this);
    this.processSubmittedBy = this.processSubmittedBy.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.filterByVotes = this.filterByVotes.bind(this);
    this.filterByTitle = this.filterByTitle.bind(this);
    this.filterBySubmittedBy = this.filterBySubmittedBy.bind(this);
    //state
    this.state = {
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
  }

  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
    this.fillSearchStateInfo();
  }

  //################################################################################################################################################################
  //########## functions for SearchComponent ######################################################################################################################
  //##############################################################################################################################################################
  parseUsername(user) {
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

  processSubmittedBy(submittedByToShow, user) {
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

  fillSearchStateInfo() {
    const products = this.state.products.sort((a, b) => {
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

    this.setState({
      search: {
        votesFrom,
        votesTo,
        submittedByToShow
      }
    })
  }

  filterByVotes(products, votesFrom, votesTo) {
    let filteredProducts = [];

    if (votesFrom.length === 0 && votesTo.length === 0)
      return products;

    products.find(product => {
      if ((votesFrom.length === 0 && product.votes <= votesTo) || (product.votes >= votesFrom && votesTo.length === 0) || (product.votes >= votesFrom && product.votes <= votesTo))
        filteredProducts.push(product);
    });

    return filteredProducts;
  }

  filterByTitle(products, title) {
    let filteredProducts = [];

    if (title.length === 0)
      return products;

    products.find(product => {
      if (product.title.toUpperCase().indexOf(title.toUpperCase()) > -1)
        filteredProducts.push(product);
    });

    return filteredProducts;
  }

  filterBySubmittedBy(products, submittedBy) {
    let filteredProducts = [];

    products.find(product => {
      if (product.submitterAvatarUrl.toUpperCase().indexOf(submittedBy.toUpperCase()) > -1)
        filteredProducts.push(product);
    })

    return filteredProducts;
  }

  doSearch(search) {
    let products = this.state.productsBackup;
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

    this.setState(
      { products: filteredProducts }
    )

  }

  resetSearch() {
    this.setState({
      products: this.state.productsBackup
    })
  }
  //##############################################################################################################################################################
  //########## end of functions for SearchComponent ###############################################################################################################
  //################################################################################################################################################################

  //################################################################################################################################################################
  //########## functions for ListComponent ########################################################################################################################
  //##############################################################################################################################################################
  processVote(votes, product) {
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

  handleProductVote(productID, type) {
    let products = this.state.products;
    let lastUpvoted = this.state.lastUpvoted;
    let lastDownvoted = this.state.lastDownvoted;
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

    this.setState({
      products,
      lastUpvoted,
      lastDownvoted
    });
  }

  changeSort(type) {
    this.setState({ sort: type })
  }
  //##############################################################################################################################################################
  //########## end of functions for ListComponent #################################################################################################################
  //################################################################################################################################################################

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
        votes: this.state.lastUpvoted
      }, {
        title: 'Last downvoted',
        votes: this.state.lastDownvoted
      }
    ]

    return (
      <div>
        <H1>Items list</H1>
        <Container>
          <LeftContainer>
            <SearchComponent
              votesFrom={this.state.search.votesFrom}
              votesTo={this.state.search.votesTo}
              submittedByToShow={this.state.search.submittedByToShow}
              resetSearch={this.resetSearch}
              doSearch={this.doSearch}
            />
            <ListComponent
              sort={this.state.sort}
              products={this.state.products}
              changeSort={this.changeSort}
              handleProductVote={this.handleProductVote}
            />
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

export default App
