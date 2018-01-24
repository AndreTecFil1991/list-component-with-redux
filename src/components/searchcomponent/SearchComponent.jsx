import React, { Component } from 'react'
import styled from 'react-emotion'

import { store } from '../../App'

class SearchComponent extends Component {
    onChange(event) {
        let origin = event.nativeEvent.target.id;
        let data = ''

        if (origin === 'submittedBy')
            data = event.nativeEvent.target.selectedOptions[0].value;
        else
            data = event.nativeEvent.target.value;

        store.dispatch({
            type: 'ON_SEARCH_DATA_CHANGE',
            origin: origin,
            data: data
        })
    }

    doSearch() {
        store.dispatch({
            type: 'DO_SEARCH'
        });
    }

    resetSearch() {
        store.dispatch({
            type: 'RESET_SEARCH'
        });
    }

    render() {
        const Container = styled('div') `
            width: 100%;
            display: flex;
            margin-bottom: 20px;
        `
        const Votes = styled('div') `
            width: 20%;
            margin-right: 10px;
            >label {
                width: 100%;
                display: block;
            }
            >div {
                width: 100%;
                >input {
                    width: 30%;
                    border-radius: 4px;
                    margin: 10px 0px;
                    padding-left: 5px;
                }
                >span {
                    margin: auto 10px;
                }
            }
            
        `

        const Title = styled('div') `
            width: 35%;
            margin-right: 10px;
            >label{
                width: 100%;
                display: block;
            }
            >input {
                width: 100%;
                border-radius: 4px;
                margin: 10px 0px;
                padding-left: 5px;
            }
        `

        const SubmittedBy = styled('div') `
            width: 25%;
            margin-right: 10px;
            margin-left: 10px;
            >label {
                width: 100%;
                display: inline-block;
                vertical-align: top;
            }
            >select {
                width: 100%;
                display: inline-block;
                border-radius: 4px;
                background: transparent;
                margin: 10px 0px;
                padding-left: 5px;
            }
        `

        const Buttons = styled('div') `
            width: 20%
            margin-top: -5px;
            >input {
                width: 100%;
                border-radius: 4px;
                margin: 5px;
                background: transparent;
                border-color: #4183C4;
                color: #4183C4;
                cursor: pointer;
                &:hover {
                    color: white;
                    background-color: #4183C4;
                }
            }
        `
        const state = store.getState();

        const options = state.search.submittedByToShow.map((submittedBy, index) => (
            <option key={submittedBy.username + index} value={submittedBy.username}>{submittedBy.username}</option>
        ));

        return (
            <Container>
                <Votes>
                    <label>Votes: </label>
                    <div>
                        <input id="votesFrom" type="number" value={state.search.votesFrom} onChange={this.onChange} /><span> to </span><input id="votesTo" type="number" value={state.search.votesTo} onChange={this.onChange} />
                    </div>
                </Votes>
                <Title>
                    <label>Title: </label>
                    <input id="title" type="text" onChange={this.onChange} />
                </Title>
                <SubmittedBy>
                    <label>Submitted By: </label>
                    <select onChange={this.onChange} id="submittedBy">
                        {options}
                    </select>
                </SubmittedBy>
                <Buttons>
                    <input type="submit" value="Search" onClick={this.doSearch} />
                    <input type="reset" onClick={this.resetSearch} />
                </Buttons>
            </Container>
        )
    }
}

export default SearchComponent