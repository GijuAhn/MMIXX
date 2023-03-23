import styled from 'styled-components'
import { useLocation } from 'react-router-dom';

const PlayBar = () => {
  const location = useLocation()

  if (location.pathname === '/mix' || location.pathname === '/' ) {
    return null
  }

  return (
    <Wrapper>
      <h2>PlayBar</h2>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100px;
  position: fixed;
  float: right;
  bottom: 0;
  left: 200px;
  width: calc(100% - 200px);
  min-width: 800px;
`

export default PlayBar;
