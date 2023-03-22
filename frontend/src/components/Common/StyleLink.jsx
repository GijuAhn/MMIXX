import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyleLink = styled(Link)`
  text-decoration: none;
  background-color: ${({ theme }) => theme.palette.secondary};
  color: ${({ theme }) => theme.palette.dark};
  padding: 10px 20px;
  border-radius: 20px;
  margin: 5px 0px;
  width: 80%;
  text-align: center;
`

export default StyleLink;