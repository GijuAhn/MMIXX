import styled from 'styled-components'
import { useRecoilState } from 'recoil';

import { defaultWidth } from 'atom/atom';

const PlayBar = () => {
  const [playbarWidth, setPlaybarWidth] = useRecoilState(defaultWidth)

  window.addEventListener('resize', () => {
    setPlaybarWidth(window.innerWidth - 300);
  })
 
  if (window.location.pathname === '/mix' || window.location.pathname === '/' ) {
    return null
  }

  return (
    <Body playbarWidth={playbarWidth}>
      <h2>PlayBar</h2>
    </Body>
  );
};


const Body = styled.div`
  width: ${({playbarWidth}) => playbarWidth}px;
  border: 1px solid blue;
  position: fixed;
  right: 0;
  bottom: 0;
  height: 150px;
  filter: drop-shadow(0px -25px 100px rgba(16, 16, 16, 0.51));
`

export default PlayBar;