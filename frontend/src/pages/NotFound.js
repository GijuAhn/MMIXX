import styled from 'styled-components'

const NotFound = () => {
  return (
    <NotFoundDiv>
      없는 페이지임
    </NotFoundDiv>
  )
}

const NotFoundDiv = styled.div`
  width: 100%;
  heightL 100%;
  position: fixed;
  z-index: 999;
  background-color: #fff;
`
export default NotFound;