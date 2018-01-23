import React, { Component } from 'react';
import styled from 'react-emotion'
import VotesContainer from './VotesContainer'

import { store } from '../../App'

export default class VotingComponent extends Component {
    render() {
        const Container = styled('div') `
            position: fixed;
            top: 100px;
            right: 30px;
            width: 30%;
        `

        //titles for VotingComponent continers
        const configs = [
            {
                title: 'Last upvoted',
                votes: store.getState().lastUpvoted
            }, {
                title: 'Last downvoted',
                votes: store.getState().lastDownvoted
            }
        ]

        let votesContainers = configs.map(config => (
            <VotesContainer key={config.title + config.votes.length} title={config.title} votes={config.votes} />
        ))

        return (
            <Container>
                {votesContainers}
            </Container>
        );
    }
}