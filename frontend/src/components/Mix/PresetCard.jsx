import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';

import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import theme from 'styles/theme';
import { PlaySlider } from 'components/PlayBar';
import { _mix_now } from 'atom/music';

const PresetCard = (props, {presetSeqFunc}) => {
  const presetName = props.presetName
  const presetNum = props.presetNum
  const musicName = props.musicName
  const musicLength = props.musicLength
  const musicianName = props.musicianName
  const presetUrl = props.presetUrl
  const coverImage = props.coverImage
  const [isSelected, setIsSelected] = useState(true)
  
  const [ mixPlay ] = useRecoilState(_mix_now)
  
  const handleMixPlay = () => {
    mixPlay.src = props.presetUrl
    mixPlay.play()
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
        <PlaySlider />
        <PlayCircleFilledRoundedIcon onClick={handleMixPlay}/>
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