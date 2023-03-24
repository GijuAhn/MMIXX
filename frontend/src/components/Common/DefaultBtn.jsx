import styled from "styled-components"

const DefaultBtn = styled.button`
  background-color: ${({theme}) => theme.palette.secondary};
  color: ${({theme}) => theme.palette.dark};
  padding: 10px 20px;
  border-radius: 27px;
  border: none;
  font-size: 14px;
  transition: all 0.1s ease-in-out;

  &: hover {
    transform: scale(1.1);
    filter: brightness(1.05);
  }
`

export default DefaultBtn;