import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import CopyIcon from '../assets/CopyIcon'
import { Heading } from '../styles/BasicComponents'
import { box_shadow, flex } from '../styles/mixins'

const DownloadFile = ({ downloadLink }) => {
    const completeLink =
        window.location.protocol + '//' + window.location.host + downloadLink

    return (
        <Styled>
            <Heading>Your File is Ready to be downloaded</Heading>
            <div>
                <Link to={downloadLink}>Go to download Page</Link>
                <div
                    onClick={() => navigator.clipboard.writeText(completeLink)}
                >
                    <CopyIcon />
                </div>
            </div>
        </Styled>
    )
}

export default DownloadFile

const Styled = styled.div`
    ${flex()}
    svg {
        width: 5vmax;
        height: 5vmax;
        stroke-width: 0.2rem;
        fill: tomato;
        stroke: tomato;
        :hover {
            fill: teal;
            stroke: teal;
            transform: scale(1.1);
        }
    }
    > div {
        ${box_shadow()}
        padding:0.5rem 1rem;
        width: 100%;
        ${flex('row', 'space-between')}
    }
`
