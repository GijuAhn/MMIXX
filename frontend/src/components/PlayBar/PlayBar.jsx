import styled from 'styled-components'
import { useLocation } from 'react-router-dom';

import { PlayIcons } from 'components/PlayBar';
import { useRecoilValue } from 'recoil';
import { testPlaylistMusic } from 'atom/atom';

const PlayBar = () => {
  const location = useLocation()
  const playlist = useRecoilValue(testPlaylistMusic)

  const { coverImage, musicName, musicianName } = playlist.playlistMusic[0].music

  if (location.pathname === '/mix' || location.pathname === '/' ) {
    return null
  }

  return (
    <Wrapper>
      <PlayMusicInfo>
        <CoverImage>
          <img src={coverImage} alt={musicName} />
        </CoverImage>
        <MusicInfo>
          <p>{musicName}</p>
          <p>{musicianName}</p>
        </MusicInfo>
      </PlayMusicInfo>
      <PlayIcons
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
  padding-left: 50px;
  padding-right: 50px;
  border: 1px dotted pink;
`

const PlayMusicInfo = styled.div`
  width: 200px;
  height: 80px;
  display: grid;
  grid-template-columns: 80px 1fr;
`

const CoverImage = styled.div`
  object-fit: cover;
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 3px;

  img {
    width: 100%;
    height: 100%;
  }
`

const MusicInfo = styled.div`
  height: 80px;
  align-items: start;
  flex-direction: column;
  justify-content: end;
  margin-left: 10px;

  p:first-child {
    font-size: 20px;
  }

  p:nth-child(2) {
    font-weight: lighter;
    font-size: 12px;
  }
`

const VolumeControl = styled.div`
  // border: 1px solid green;
  width: 200px;
`

export default PlayBar;
