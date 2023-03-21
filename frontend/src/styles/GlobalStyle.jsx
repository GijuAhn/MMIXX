import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
      font-family: 'Noto Sans KR', sans-serif;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      color: ${({ theme }) => theme.palette.light }
  }
`

export default GlobalStyle;