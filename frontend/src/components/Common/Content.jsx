import styled from 'styled-components'

const Content = styled.div`
  background-color: ${({ theme }) => theme.palette.darkAlt};
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: start;

  padding-left: 200px;

`
export default Content;