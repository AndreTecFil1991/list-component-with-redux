import React, { Component } from 'react'
import styled from 'react-emotion'


export default class Votes extends Component {
    render() {
        const Container = styled('div')`
            margin: 10px;
        `

        const Vote = styled('div')`
            margin: 5px 5px;
            font-weight: bold;
        `

        const Title = styled('div')`
            text-align: left;
            width: 85%;
        `

        const Counter = styled('div')`
            text-align: right;
        `

        const votes = this.props.votes.map((vote, index) => (
            <Vote key={index}>
                <Title>{vote.title}</Title>
                <Counter>Votes: {vote.counter}</Counter>
            </Vote>
        ))

        return (
            <Container>
                {votes}
            </Container>
        );
    }
}