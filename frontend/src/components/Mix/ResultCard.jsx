import * as React from 'react';
import styled from 'styled-components'
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { testPlaylistMusic } from 'atom/atom';
import { useRecoilValue } from 'recoil';
import theme from 'styles/theme';

const ResultCard = () => {

  const theme = useTheme();
  const playlist = useRecoilValue(testPlaylistMusic)
  const { coverImage, musicName, musicianName } = playlist.playlistMusic[0].music
  return (
    <ResultCardWrapper>
      <Card>
        <CoverImage>
          <img src={coverImage} alt={musicName} />
        </CoverImage>
        <Content>
          <h2>{ musicName }</h2>
          <p>{ musicianName }</p>
        </Content>
      </Card>
      <PlayBar>
        <IconButton aria-label="previous">
          {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
        </IconButton>
        <IconButton aria-label="play/pause">
          <PlayArrowIcon sx={{ height: 38, width: 38 }} />
        </IconButton>
        <IconButton aria-label="next">
          {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
        </IconButton>
      </PlayBar>
    </ResultCardWrapper>
  )
}

export default ResultCard

const ResultCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid;
  border-radius: 5px;
  width: 400px;
  height: 300px;
`

const Card = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
`
const Content = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: center;
  pl: 1;
  pb: 1;
`

const CoverImage = styled.div`
  object-fit: cover;
  width: 330px;
  height: 200px;
  overflow: hidden;
  border-radius: 5px;
  img {
    width: 100%;
    height: 100%;
  }
`
const PlayBar = styled.div`
  display: 'flex', 
  align-items: 'center', 
  pl: 1, 
  pb: 1
`