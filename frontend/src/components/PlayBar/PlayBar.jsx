import styled from 'styled-components'
import { useLocation } from 'react-router-dom';

import { PlayControl } from 'components/PlayBar';

const PlayBar = () => {
  const location = useLocation()

  if (location.pathname === '/mix' || location.pathname === '/' ) {
    return null
  }

  return (
    <Wrapper>
      <PlayMusicInfo />
      <PlayControl 
        width="30%"
        height="30%"
      />
      <VolumeControl />
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
  justify-content: space-between;
  filter: blur(50px)
`

const PlayMusicInfo = styled.div`
  border: 1px solid yellow;
  width: 100px;
`

const CoverImage = styled.img`
`

const VolumeControl = styled.div`
  border: 1px solid green;
  width: 100px;
`

export default PlayBar;
