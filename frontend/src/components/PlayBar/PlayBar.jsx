import styled from 'styled-components'
import { useLocation } from 'react-router-dom';

const PlayBar = () => {
  const location = useLocation()

  if (location.pathname === '/mix' || location.pathname === '/' ) {
    return null
  }

  return (
    <Div>
      <h2>PlayBar</h2>
    </Div>
  );
};


const Div = styled.div`
  width: 100%;
  border: 1px solid blue;
  position: fixed;
  left: 300px;
  bottom: 0;
  height: 150px;
  filter: drop-shadow(0px -25px 100px rgba(16, 16, 16, 0.51));
`

export default PlayBar;
