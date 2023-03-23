import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {

  }
  * { 
    font-family: 'Noto Sans KR', sans-serif;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    color: ${({ theme }) => theme.palette.light }
  }
  nav,
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    width: 100%;
  }
  button {
    cursor: pointer;
    border: none;
  }
`

export default GlobalStyle;