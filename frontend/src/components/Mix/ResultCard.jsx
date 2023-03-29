import * as React from 'react';
import styled from 'styled-components'
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { testPlaylistMusic } from 'atom/atom';
import { useRecoilValue } from 'recoil';

const ResultCard = () => {

  const theme = useTheme();
  const playlist = useRecoilValue(testPlaylistMusic)
  const { coverImage, musicName, musicianName } = playlist.playlistMusic[0].music
  return (
    <ResultCardWrapper>
      <Card sx={{ display: 'flex', flexDirection: 'row' }}>
        <CoverImage>
          <img src={coverImage} alt={musicName} />
        </CoverImage>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pl: 1, pb: 1 }}>
          <h2>{ musicName }</h2>
          <p>{ musicianName }</p>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <IconButton aria-label="previous">
              {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
            </IconButton>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
            <IconButton aria-label="next">
              {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
            </IconButton>
          </Box>
        </Box>
      </Card>
    </ResultCardWrapper>
  )
}

export default ResultCard

const ResultCardWrapper = styled.div`
  display: flex;
  flexDirection: column;
  border: 1px solid;
  borderColor: white;
  width: 400px;
  height: 300px;
`

const Card = styled.div`
  display: flex;
  flexDirection: row;
`

const CoverImage = styled.div`
  object-fit: cover;
  width: 330px;
  height: 200px;
  overflow: hidden;
  border-radius: 3px;

  img {
    width: 100%;
    height: 100%;
  }
`