import React, { useState } from 'react';
import styled from 'styled-components'
import { useTheme } from '@mui/material/styles';
// import { testPlaylistMusic } from 'atom/atom';
// import { useRecoilValue } from 'recoil';
import theme from 'styles/theme';
import { PlaySlider, PlayIcons } from 'components/PlayBar';

const ResultCard = (props) => {
  const theme = useTheme();

  const musicUrl = props.musicUrl
  const musicName = props.musicName
  const musicianName = props.musicianName
  const coverImage = props.coverImage

  // const playlist = useRecoilValue(testPlaylistMusic)
  // const { coverImage, musicName, musicianName } = playlist.playlistMusic[0].music
  return (
    <ResultCardWrapper>
      <Card>
        <CoverImage>
          <img src={ coverImage } alt={ musicName } />
        </CoverImage>
        <Content>
          <h2>{ musicName }</h2>
          <p>{ musicianName }</p>
        </Content>
      </Card>
      <MusicPlayer>
        <PlaySlider />
        <PlayIcons />
      </MusicPlayer>
    </ResultCardWrapper>
  )
}

export default ResultCard

const ResultCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid;
  border-radius: 5px;
  width: 30vw;
  height: 30vh;
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
  width: 17vw;
  height: 20vh;
  overflow: hidden;
  border-radius: 1vw;
  img {
    width: 100%;
    height: 100%;
  }
`
const MusicPlayer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: 'flex-start';
  margin: 1px;
`