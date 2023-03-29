import * as React from 'react';
import { Box } from '@mui/material';
import styled from 'styled-components';
import { testPlaylistMusic } from 'atom/atom';
import { useRecoilValue } from 'recoil';
import theme from 'styles/theme';
import { useState } from 'react';

const MusicInfo = (props) => {
  // const music_name = props.music_name
  // const music_singer = props.music_singer
  const [hidden, setHidden] = useState(false)
  const playlist = useRecoilValue(testPlaylistMusic)
  const { coverImage, musicName, musicianName } = playlist.playlistMusic[0].music
  return (
    <div>
      { !hidden && (<MiniCover
        onMouseEnter={ () => setHidden(true)}
        >
        <img src={coverImage} alt={musicName} />
      </MiniCover>)}

      { hidden && (
        <Card onMouseOut={ () => setHidden(false)}>
          <CoverImage>
            <img src={coverImage} alt={musicName} />
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
  Width: 230px;
  Height: 100px;
  background-color: ${theme.palette.light};
  border-radius: 3px;
`

const CoverImage = styled.div`
  object-fit: cover;
  width: 150px;
  height: 100px;
  overflow: hidden;
  border-radius: 3px;

  img {
    width: 100%;
    height: 100%;
  }
`
const MiniCover = styled.div`
  object-fit: cover;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 70%;
  img {
    width: 100%;
    height: 100%;
  }
`