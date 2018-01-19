
import React, { Component } from 'react'
import styled from 'react-emotion'
import Votes from './Votes'

class VotesContainer extends Component {
    render() {
        const votes = this.props.votes;

        const Container = styled('div') `
            margin-bottom: 30px;
        `

        const Box = styled('div') `
            border: solid 1px black;
            border-radius: 4px;
            height: 180px;
            overflow-y: auto;
        `

        return (
            <Container>
                <h3>{this.props.title}</h3>
                <Box>
                    <Votes votes={votes} />
                </Box>
            </Container>
        )
    }
}

export default VotesContainer;
