import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { fileUploadIcon } from '../assets/assets'
import AudioIcon from '../assets/AudioIcon'
import ImageIcon from '../assets/ImageIcon'
import VideoIcon from '../assets/VideoIcon'
import { Button } from '../styles/BasicComponents'
import axios from 'axios'
import { border, box_shadow, flex } from '../styles/mixins'
import DownloadFile from './DownloadFile'
import SendEmail from './SendEmail'

const Dropzone = () => {
    const {
        getRootProps,
        getInputProps,
        isDragAccept,
        isDragReject,
        isFocused,
    } = useDropzone({
        multiple: false,
        accept: ['image/*', 'audio/mpeg', 'video/mp4'],
        onDrop: (files) => setFile(files[0]),
    })

    const [file, setFile] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [downloadLink, setDownloadLink] = useState('')

    const filetype = file?.type.split('/')[0]

    const handleUpload = async (e) => {
        setLoading(true)
        try {
            const form = new FormData()
            form.append('file', file)
            const { data } = await axios.post('/api/upload', form)
            if (data.success) {
                const { _id: fileId } = data.file
                setDownloadLink(`/download/${fileId}`)
                setSuccess(true)
            }
        } catch (error) {
            setError(error)
        }
        setFile()
        setLoading(false)
    }

    useEffect(() => {
        if (error) {
            setTimeout(() => setError(null), 5000)
        }
        if (success) {
            setTimeout(() => setSuccess(false), 5000)
        }
    }, [error, success])

    return (
        <>
            <Styled
                {...getRootProps({ isDragAccept, isFocused, isDragReject })}
            >
                <div>
                    <img src={fileUploadIcon} alt="upload icon" />
                    <input {...getInputProps()} />

                    <p>
                        Drag 'n' drop some files here, or click to select files
                    </p>

                    {/* {isDragAccept&&} */}
                </div>
                {isDragReject && (
                    <p className="red">Please Select a valid file</p>
                )}
            </Styled>
            {file && (
                <FileStyled>
                    <div className="icon">
                        {filetype === 'image' && <ImageIcon />}
                        {filetype === 'audio' && <AudioIcon />}
                        {filetype === 'video' && <VideoIcon />}
                    </div>
                    <span>Name :{file.name}</span>
                    <span>Size :{file.size}</span>
                    <span>Type : {file.type}</span>
                    <Button onClick={handleUpload}>
                        {loading ? 'Upload...' : 'Upload'}
                    </Button>
                </FileStyled>
            )}
            {error && (
                <p style={{ color: 'red' }} className="">
                    {error.message}
                </p>
            )}
            {success && (
                <p style={{ color: 'green' }}>File Uploaded Successfully</p>
            )}
            {downloadLink && <DownloadFile downloadLink={downloadLink} />}
            {downloadLink && <SendEmail fileId={downloadLink.split('/')[2]} />}
        </>
    )
}

export default Dropzone

const getColor = (props) => {
    if (props.isDragAccept) {
        return '#00e676'
    }
    if (props.isDragReject) {
        return '#ff1744'
    }
    if (props.isFocused) {
        return '#2196f3'
    }
    return '#eeeeee'
}

const Styled = styled.div`
    ${flex()}
    width: 50vmax;
    height: 100%;
    padding: 1rem;
    pointer-events: none;
    > div:first-child {
        pointer-events: all;
        ${flex('column')}
        border-radius: 0.5rem;
        /* ${border('dashed', '2px')} */
        /* ${box_shadow('10px', '1px', 'pink')}; */
        /* border-color: ${(props) => getColor(props)}; */
        border-width: 3px;
        border-style: dashed;
        min-height: 50vmin;
        width: 100%;
        padding: 2rem;
        transition: all 0.3s linear;
        img {
            width: 50px;
            transition: all 0.3s linear;
            cursor: pointer;
            :hover {
                transform: scale(1.1);
            }
        }
        p {
            text-align: center;
            cursor: default;
        }

        ${({ isFocused, isDragAccept, isDragReject }) => {
            if (isFocused) {
                return {
                    borderColor: 'skyblue ',
                    backgroundColor: '#eeffcc33',
                }
            }
            if (isDragAccept) {
                return {
                    borderColor: 'green ',
                    backgroundColor: '#aaffcc88',
                    boxShadow: '0px 0px 10px 1px lightgreen',
                }
            }
            if (isDragReject) {
                return {
                    borderColor: 'red ',
                    backgroundColor: '#ee223376',
                    boxShadow: '0px 0px 10px 1px lightpink',
                }
            }
            return {
                borderColor: 'lightgrey',
                backgroundColor: 'transparent',
                boxShadow: '0px 0px 0px 0px lightpink',
            }
        }}
    }
    .red {
        position: absolute;
        color: red;
        bottom: 5rem;
    }
`

const FileStyled = styled.div`
    ${flex('', '', 'start')}
    width: 100%;
    ${border()}
    border-radius:0.4rem;
    background-color: tomato;
    color: white;
    padding: 0.5rem 1rem;
    .icon {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        svg {
            width: 10vmin;
            height: 10vmin;
            font-size: 1rem;
            color: teal;
            stroke: teal;
            fill: teal;
        }
    }
    button {
        margin: auto;
        transition: all 0.23s linear;
        :hover {
            background-color: #46b483;
            transform: scale(1.1);
        }
        :active {
            background-color: #eecc77;
            transform: scale(1);
        }
    }
    @media (max-width: 768px) {
        width: 70vmax;
    }
`
