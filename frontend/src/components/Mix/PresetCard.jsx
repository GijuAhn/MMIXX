import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import theme from 'styles/theme';

import styled from 'styled-components';
import { testPlaylistMusic } from 'atom/atom';
import { useRecoilValue } from 'recoil';

const PresetCard = (props, {presetSeqFunc}) => {
  const preset_name = props.preset_name
  const presetSeq = props.presetSeq
  // const musicName = props.musicName
  // const musicianName = props.musicianName
  // const coverImage = props.coverImage
  const tm = useTheme();

  const playlist = useRecoilValue(testPlaylistMusic)
  const { coverImage, musicName, musicianName } = playlist.playlistMusic[0].music

  return (
    <Card onClick={() => props.presetSeqFunc(presetSeq) }>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <CoverImage>
          <img src={coverImage} alt={musicName} />
        </CoverImage>
        <Content>
          <div style={{ color: `${theme.palette.secondary}`, fontSize: 35, fontWeight: 'bolder', justifyContent: 'flex-start' }}>
            { preset_name }
            {/* PRESET NAME */}
          </div>
          <div style={{ color: `${theme.palette.light}`, fontSize: 25, fontWeight: 'bold', justifyContent: 'flex-start' }}>
            { musicName }
          </div>
          <div style={{ color: `${theme.palette.light}`, fontWeight: 'normal', justifyContent: 'flex-start' }}>
            { musicianName }
          </div>
        </Content>
      </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          {/* <IconButton aria-label="previous">
            {tm.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton> */}
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          {/* <IconButton aria-label="next">
            {tm.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton> */}
        </Box>
    </Card>
  );
}

export default PresetCard

const Card = styled.div`
  display: flex; 
  flex-direction: column;
  width: 30vw; 
  height: 40vh; 
  border: 3px solid ${theme.palette.secondary};
  border-radius: 10px;
  background-color: ${theme.palette.dark};
  padding: 3vw;
`
const CoverImage = styled.div`
  object-fit: cover;
  width: 25vw;
  height: 22vh;
  overflow: hidden;
  border-radius: 1vw;

  img {
    width: 100%;
    height: 100%;
  }
`
const Content = styled.div`
 display: flex;
 flex-direction: column;
 padding-left: 3vw
`