import React from 'react'
import Dropzone from '../components/Dropzone'
import styled from 'styled-components'
import { flex } from '../styles/mixins'
import { Heading } from '../styles/BasicComponents'

const Home = () => {
    return (
        <Styled className="App">
            <Heading>Share Files</Heading>
            <Dropzone />
        </Styled>
    )
}

const Styled = styled.div`
    ${flex()}
`

export default Home
