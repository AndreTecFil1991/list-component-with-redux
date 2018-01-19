import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers/index.js'

import AppContainer from './AppContainer.jsx';
import products from './js/MockData.js'


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

let store = createStore(reducer, initialState);

const listener = () => {
    console.log('Current state: ', store.getState().votes);
}
store.subscribe(listener);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>, document.getElementById('content'));
