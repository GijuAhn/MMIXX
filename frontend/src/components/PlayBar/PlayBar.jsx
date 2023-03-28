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
      <PlayMusicInfo>
        <CoverImage />
      </PlayMusicInfo>
      <PlayControl
        width="30%"
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
  min-width: 1000px;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
`

const PlayMusicInfo = styled.div`
  border: 1px solid yellow;
  width: 200px;
  height: 100%;
`

const CoverImage = styled.div`
  border: 1px solid green;
`

const VolumeControl = styled.div`
  border: 1px solid green;
  width: 200px;
`

export default PlayBar;
