import { useState, useEffect } from 'react'
import styled from 'styled-components'
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import PauseCircleRoundedIcon from '@mui/icons-material/PauseCircleRounded';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import RepeatOneRoundedIcon from '@mui/icons-material/RepeatOneRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';

import { useAudioControl } from 'hooks/useAudioControl';
import { usePlayControl } from 'hooks/usePlayControl';

const PlayControl = ({ width, height }) => {
  const { audio } = useAudioControl()
  const { isPlaying, playMusic, audioElement, handlePlay, handlePause } = usePlayControl()

  const handlePlayMusic = () => {
    if (audioElement.paused) {
      playMusic()
    }
  }

  return (
    <IconWrapper width={width} height={height}>
      <ShuffleRoundedIcon fontSize="small"/>
      <SkipPreviousRoundedIcon />
      {!isPlaying ? 
        <StylePlayCircleFilledRoundedIcon 
          color="color"
          onClick={handlePlay}
        />
      :
        <PauseCircleRoundedIcon onClick={handlePause}/>
      }
      <SkipNextRoundedIcon />
      <RepeatOneRoundedIcon />
    </IconWrapper>
  )
}

const IconWrapper = styled.div`
  width: ${({width}) => width ? width: 'auto'};
  height: ${({height}) => height ? height: 'auto'};
  // border: 1px solid red;
  justify-content: space-around;
  
  * {
    // border: 1px dotted pink;
  }

  > :nth-child(3) {
    border: 1px dotted green;
    transition: all 0.1s ease-in-out;
    color: ${({color, theme}) => color === 'color' ? theme.palette.secondary : 'white'};
    font-size: 40px;

    &:hover {
      transform: scale(1.1);
      cursor: pointer;
    }

  }
`

const StylePlayCircleFilledRoundedIcon = styled(PlayCircleFilledRoundedIcon)`
  color: ${({color, theme}) => color ? theme.palette.secondary : 'red'};
  transition: all 0.1s ease-in-out;
`

export default PlayControl;