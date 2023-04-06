import { useEffect } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom';
import AlbumIcon from '@mui/icons-material/Album'

import VolumeControl from './VolumeControl'
import PlayControl from './PlayControl'
import { usePlayControl } from 'hooks/usePlayControl';

const PlayBar = () => {
  const location = useLocation()
  const { nowMusic } = usePlayControl()
  const { coverImage, musicName, musicianName } = nowMusic

  useEffect(() => {
    // playMusic()
  }, [nowMusic])

  if (location.pathname === '/mix' || location.pathname === '/' || location.pathname === '/mix/result' ) {
    return null
  }

  return (
    <Wrapper>
      <PlayMusicInfo>
        {coverImage ?
          <CoverImage>
              <img src={coverImage} alt={musicName} />
          </CoverImage>
        :
          <DefaultCoverImage>
            <AlbumIcon />
          </DefaultCoverImage>
        }
        <MusicInfo>
          <p>{musicName}</p>
          <p>{musicianName}</p>
        </MusicInfo>
      </PlayMusicInfo>
      <PlayControl nowMusic={nowMusic}/>
      <VolumeWrapper>
        <VolumeControl />
      </VolumeWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  backdrop-filter: blur(10px);
  position: fixed;
  bottom: 0;
  left: 200px;
  width: calc(100% - 200px);
  min-width: 1000px;
  justify-content: space-evenly;
  padding: 10px 30px;
  background-color: ${({theme}) => theme.palette.darkgray};
`

// const Wrapper = styled.div`
//   height: 100px;
//   position: fixed;
//   bottom: 0;
//   left: 200px;
//   width: calc(100% - 200px);
//   min-width: 1000px;
//   justify-content: space-evenly;
//   padding-left: 30px;
//   padding-right: 30px;
//   border: 1px dotted pink;

//   backdrop-filter: blur(10px);

//   @media (max-width: 768px) {
//     left: 0;
//   }
// `

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

const DefaultCoverImage = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(to bottom right, ${({theme}) => theme.palette.darkgray} 30%, ${({theme}) => theme.palette.dark});
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

const VolumeWrapper = styled.div`
  // border: 1px solid green;
  width: 200px;
`

export default PlayBar;
