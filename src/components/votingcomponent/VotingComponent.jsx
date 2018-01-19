import React, { Component } from 'react';
import styled from 'react-emotion'
import VotesContainer from './VotesContainer'


export default class VotingComponent extends Component {
    render() {
        const Container = styled('div') `
            position: fixed;
            top: 100px;
            right: 30px;
            width: 30%;
        `
        const configs = this.props.config

        let votesContainers = configs.map(config => (
            <VotesContainer key={config.title+config.votes.length} title={config.title} votes={config.votes} />
        ))

        return (
            <Container>
                {votesContainers}
            </Container>
        );
    }
}