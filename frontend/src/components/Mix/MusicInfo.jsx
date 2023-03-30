import * as React from 'react';
import { Box } from '@mui/material';
import styled from 'styled-components';
// import { testPlaylistMusic } from 'atom/atom';
// import { useRecoilValue } from 'recoil';
import theme from 'styles/theme';
import { useState } from 'react';

const MusicInfo = (props) => {
  const coverImg = props.coverImage
  const musicName = props.musicName
  const musicianName = props.musicianName
  const [hidden, setHidden] = useState(false)
  // const playlist = useRecoilValue(testPlaylistMusic)
  // const { coverImage, musicName, musicianName } = playlist.playlistMusic[0].music
  return (
    <div>
      { !hidden && (<MiniCover
        onMouseEnter={ () => setHidden(true) }
        >
        <img src={coverImg} alt={musicName} />
      </MiniCover>)}

      { hidden && (
        <Card onMouseOut={ () => setHidden(false) }>
          <CoverImage>
            <img src={coverImg} alt={musicName} />
          </CoverImage>
          <Box style={{ display: 'grid' }}>
            <Box sx={{ color: `${theme.palette.dark}`, fontSize: 20, fontWeight: 'medium' }}>
              {/* { music_name } */}
              { musicName }
            </Box>
            <Box sx={{ color:`${theme.palette.dark}` }}>
              {/* { music_singer } */}
              { musicianName }
            </Box>
          </Box>
        </Card>
      )}
    </div>
  );
}

export default MusicInfo

const Card = styled.div`
  display: flex;
  flex-direction: row;
  Width: 17vw;
  Height: 15vh;
  background-color: ${theme.palette.light};
  border-radius: 1vw;
`

const CoverImage = styled.div`
  object-fit: cover;
  width: 17vw;
  height: 15vh;
  overflow: hidden;
  border-radius: 1vw;

  img {
    width: 100%;
    height: 100%;
  }
`
const MiniCover = styled.div`
  object-fit: cover;
  width: 8vw;
  height: 15vh;
  overflow: hidden;
  border-radius: 70%;
  img {
    width: 100%;
    height: 100%;
  }
`