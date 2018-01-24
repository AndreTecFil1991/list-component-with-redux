import React, { Component } from 'react'
import styled from 'react-emotion'
import { createStore } from 'redux'

import reducer from './reducer'

import ListComponent from './components/listcomponent/ListComponent'
import VotingComponent from './components/votingcomponent/VotingComponent'
import SearchComponent from './components/searchcomponent/SearchComponent'

import products from './js/MockData.js'

//################################################################################################################################################################
//########## REDUX ##############################################################################################################################################
//##############################################################################################################################################################
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

    return (
      <div>
        <H1>Items list</H1>
        <Container>
          <LeftContainer>
            <SearchComponent />
            <ListComponent />
          </LeftContainer>
          <RightContainer>
            <VotingComponent />
          </RightContainer>
        </Container>
      </div>
    );
  }
}