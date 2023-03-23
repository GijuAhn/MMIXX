import styled from 'styled-components'

const DefaultBtn = styled.button`
  background-color: ${({ theme }) => theme.palette.dark };
  border: none;
  position: fixed;
  bottom: 0;
  padding: 20px 0;

  &: hover {
    color: red;
  }
`

export default DefaultBtn;