import { createGlobalStyle } from 'styled-components'
import { flex } from './mixins'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font:normal 400 1.2rem/1.2 Roboto;
    #root{
      min-width: 100vw;
      min-height: 100vh;
      ${flex()}
      background-color: #485461;
      background-image: linear-gradient(315deg, #485461 0%, #28313b 74%);
    }
    *{
        box-sizing:border-box;
    }
    input,button{
        outline: none;
        border: none;
    }
    ul{
        list-style: none;
    }
    a{
      text-decoration:none;
      color:tomato;
      :hover{
        font-weight:bold;
        text-decoration: underline;
      }

    }
    p{
      color:gray;
    }
    
  }
`

export default GlobalStyle
