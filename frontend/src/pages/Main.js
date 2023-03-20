import styled from 'styled-components'

const Main = () => {
  return (
    <MainBody>
      <h2>Main페이지</h2>
    </MainBody>
  );
};

const MainBody = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.darkAlt }
`

export default Main;