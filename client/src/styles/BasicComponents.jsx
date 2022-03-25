import styled from 'styled-components'

export const Button = styled.button`
    background: steelblue;
    padding: 0.5rem 1rem;
    font: normal 500 1rem Roboto;
    color: #fff;
    border-radius: 0.5rem;
`

export const Input = styled.input`
    border: 1px solid #ccc;
    padding: 0.5rem;
    font: 500 1rem Roboto;
    word-wrap: break-word;
    background-color: #ccc;
`

export const Text = styled.text`
    font: 400 0.8rem 'helvetica';
`

export const Heading = styled.h1`
    color: ${({ color }) => color || 'cornflowerblue'};
    font-size: 2rem;
    text-align: center;
    text-transform: ${({ transform }) => transform || 'none'};
`

export const Link = styled.a`
    font-style: italic;
    transition: all 0.3s linear;
    :hover {
        color: red;
        font-weight: bold;
        text-decoration: underline;
    }
`

export const Textarea = styled.textarea``
