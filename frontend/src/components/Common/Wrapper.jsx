import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.darkAlt};
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-left: 200px;
`
export default Wrapper;