import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Input } from '../styles/BasicComponents'
import styled from 'styled-components'
import { flex } from '../styles/mixins'

const SendEmail = ({ fileId }) => {
    const [email, setEmail] = useState({ sender: '', receiver: '' })

    const [message, setMessage] = useState()
    const [error, setError] = useState()
    const [buttonText, setButtonText] = useState('Send')

    const { sender, receiver } = email

    const handleSendEmail = async (e) => {
        e.preventDefault()
        if (!sender.trim() || !receiver.trim) return
        setButtonText('Sending...')
        try {
            const { data } = await axios.post(
                '/api/file/send_mail',
                {
                    to: receiver,
                    from: sender,
                    fileId,
                }
            )
            if (data.success) {
                setMessage(data.message)
                setButtonText('Sent')
            }
        } catch (error) {
            setError(error.response.data.message)
            setButtonText('Failed')
        }
    }

    const handleChange = (e) => {
        setEmail((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        setTimeout(() => {
            if (buttonText === 'Sent') setButtonText('Send Again')
            if (buttonText === 'Failed') setButtonText('Try Again')
            if (error) setError(null)
            if (message) setMessage(null)
        }, 5000)
    }, [buttonText, error, message])

    return (
        <>
            {error && (
                <h3
                    style={{
                        color: 'red',
                        fontSize: '1rem',
                        padding: '0.5rem 1rem',
                        background: 'transparent',
                    }}
                >
                    {error}
                </h3>
            )}
            {message && (
                <h3
                    style={{
                        color: 'green',
                        fontSize: '1rem',
                        padding: '0.5rem 1rem',
                        background: 'transparent',
                    }}
                >
                    {message}
                </h3>
            )}
            <Form onSubmit={handleSendEmail}>
                <Input
                    value={sender}
                    onChange={handleChange}
                    type="email"
                    placeholder="Your Email"
                    name="sender"
                />
                <Input
                    value={receiver}
                    onChange={handleChange}
                    type="email"
                    placeholder="Receiver's Email"
                    name="receiver"
                />
                <Button type="submit">{buttonText}</Button>
            </Form>
        </>
    )
}

const Form = styled.form`
    ${flex('', 'space-between')}
    min-width:50vmin;
    width: 50vmax;
    height: 30vmin;
    padding: 1rem 2rem;
    background: #ffeecc33;
    border-radius: 0.4rem;
    margin: 1rem;
    h1 {
        font: normal 1rem Roboto;
    }
    input {
        min-width: 40vmax;
        max-width: 60%;
        border-radius: 0.4rem;
        text-align: center;
        :focus {
            background-color: #ffefc376;
            color: white;
        }
    }
    button {
        background-color: tomato;
        transition: all 0.24s linear;
        :hover {
            transform: scale(1.1);
            background-color: #17ff2276;
        }
        :active {
            transform: scale(1);
            background-color: #17ff22aa;
        }
    }
`

export default SendEmail
