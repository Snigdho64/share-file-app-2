import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import AudioIcon from '../assets/AudioIcon'
import DownloadIcon from '../assets/DownloadIcon'
import ImageIcon from '../assets/ImageIcon'
import VideoIcon from '../assets/VideoIcon'
import { Button, Heading } from '../styles/BasicComponents'
import { box_shadow, flex } from '../styles/mixins'
import fileDownload from 'js-file-download'

const Download = () => {
    const [loading, setLoading] = useState()
    const [file, setFile] = useState()
    const [error, setError] = useState()

    const { fileId } = useParams()

    const getFiles = useCallback(async () => {
        const { data } = await axios.get(
            `/api/file/${fileId}`
        )
        if (data.success) {
            return data.file
        } else {
            throw new Error('File not found')
        }
    }, [fileId])

    useEffect(() => {
        setLoading(true)
        getFiles()
            .then((file) => setFile(file))
            .catch((error) => setError(error.message))
        setLoading(false)
    }, [getFiles])

    const filetype = file && file.mimetype.split('/')[0]

    const handleDownload = async () => {
        const { data } = await axios.get(
            `/api/file/${fileId}/download`,
            { responseType: 'blob' }
        )
        fileDownload(data, file.filename)
    }

    return loading ? (
        <div>
            <Heading>Loading</Heading>
        </div>
    ) : (
        <Styled>
            {file && (
                <div>
                    <div className="icon">
                        {filetype === 'image' && <ImageIcon />}
                        {filetype === 'audio' && <AudioIcon />}
                        {filetype === 'video' && <VideoIcon />}
                    </div>
                    <p>
                        Name : <span>{file.filename}</span>
                    </p>
                    <p>
                        Type : <span>{file.mimetype.split('/')[0]}</span>
                    </p>
                    <p>
                        Format : <span>{file.mimetype.split('/')[1]}</span>
                    </p>
                    <p>
                        Created At :{' '}
                        <span>{new Date(file.createdAt).toLocaleString()}</span>
                    </p>
                    <Button onClick={handleDownload}>
                        Download
                        <DownloadIcon />
                    </Button>
                </div>
            )}
            {error && <p>{error.message}</p>}
        </Styled>
    )
}

const Styled = styled.div`
    > div {
        min-width: 50vmin;
        max-width: 50vmax;
        white-space: wrap;
        word-break: break-all;
        padding: 1rem;
        ${flex('', '', 'start')}
        ${box_shadow('', '', 'lightgrey')}
        border-radius:0.5rem;
        background-image: linear-gradient(-180deg, #fff3, #fab7);
        .icon {
            margin: auto;
            svg {
                stroke: #333;
                fill: #333;
            }
        }
        p {
            color: chocolate;
            span {
                color: darkgrey;
            }
        }
        button {
            margin: auto;
            ${flex('row')}
            svg {
                stroke: white;
                fill: white;
                height: 1.4rem;
            }
            :hover {
                background-color: green;
                transform: scale(1.1);
                svg {
                    stroke: tomato;
                    fill: tomato;
                }
            }
        }
    }
`

export default Download
