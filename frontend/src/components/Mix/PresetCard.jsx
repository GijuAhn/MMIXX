import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { useRecoilState, useRecoilValue } from 'recoil';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import StopCircleRoundedIcon from '@mui/icons-material/StopCircleRounded';

import theme from 'styles/theme';
import { _mix_now } from 'atom/music';
import { PlayIcons, PlaySlider } from 'components/PlayBar';

const PresetCard = (props, {presetSeqFunc}) => {
  const {
    presetName,
    presetNum,
    musicName,
    musicLength,
    musicianName,
    presetUrl,
    coverImage
  } = props
  const [isSelected, setIsSelected] = useState(true)

  const [ mixPlay ] = useRecoilState(_mix_now)
  const [ mixPlaying, setMixPlaying ] = useState(false)

  const handleMixPlay = () => {
    if (!mixPlay.paused) {
      mixPlay.pause()
      setMixPlaying(false)
    } else {
      mixPlay.src = props.presetUrl
      mixPlay.play()
      setMixPlaying(true)
    }
    if(mixPlay.src === presetUrl) {
      console.log('일치')
    }
  }
  
  useEffect(() => {
    if (props.selNum === presetNum) {
      setIsSelected(true)
    } else {
      setIsSelected(false)
    }
  }, [props.selNum])

  return (
    <Card isSelected={isSelected} onClick={() => props.presetSeqFunc(presetNum) }>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <CoverImage>
          <img src={coverImage} alt={musicName} />
        </CoverImage>
        <Content>
          <div style={{ color: `${theme.palette.secondary}`, fontSize: '3vw', fontWeight: 'bolder', justifyContent: 'flex-start' }}>
            { presetName }
          </div>
          <div style={{ color: `${theme.palette.light}`, fontSize: '1.5vw', fontWeight: 'bold', justifyContent: 'flex-start' }}>
            { musicName }
          </div>
          <div style={{ color: `${theme.palette.light}`, fontSize: '0.8vw', fontWeight: 'normal', justifyContent: 'flex-start' }}>
            { musicianName }
          </div>
        </Content>
      </Box>

      {/* 프리셋 음악 재생 */}
      <MusicPlayer>
        {/* <IconButton aria-label="play/pause" sx={{ color: theme.palette.light }}>
          <PlayArrowIcon sx={{ height: 38, width: 38 }} />
        </IconButton> */}
        <PlaySlider audioState={mixPlay}/>
        {/* <PlayIcons /> */}
        {mixPlaying && mixPlay.src === props.presetUrl ?
          <StopCircleRoundedIcon onClick={handleMixPlay} fontSize="large"/>
        :
          <PlayCircleFilledRoundedIcon onClick={handleMixPlay} fontSize="large"/>
        }
      </MusicPlayer>
    </Card>
  );
}

export default PresetCard

const Card = styled.div`
  display: flex; 
  flex-direction: column;
  width: 30vw; 
  height: 43vh; 
  border: 3px ${props => props.isSelected ? 'solid' : 'dashed'} ${props => (props.isSelected ? theme.palette.secondary : theme.palette.light)};
  border-radius: 10px;
  background-color: ${theme.palette.dark};
  padding: 3vw;
`
const CoverImage = styled.div`
  object-fit: cover;
  width: 25vw;
  height: 23vh;
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
  padding-left: 3vw;
  align-items: center;
  pl: 1;
  pb: 1;
`

const MusicPlayer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: 'flex-start';
  margin: 1px;
`