import styled from 'styled-components'
import { useState, useEffect } from 'react'
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import StopCircleRoundedIcon from '@mui/icons-material/StopCircleRounded';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import RepeatOneRoundedIcon from '@mui/icons-material/RepeatOneRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';

import Remix from 'assets/music/NewJeans-Future Funk Remix.mp3'
// import Retro from 'assets/music/NewJeans-Retro.mp3'

const PlayControl = ({ width, height }) => {
  const [ isPlaying, setIsPlaying ] = useState(false)
  const [ audioElement, setAudioElement ] = useState(null)

  const testPlay = () => {
    if (isPlaying) {
      audioElement.pause()
      setIsPlaying(false)
    } else {
      audioElement.currentTime = 32
      audioElement.play()
      setIsPlaying(true)
      console.log(isPlaying)
      // audioElement.currentTime(30)
      audioElement.volume = 1
      console.log(audioElement.volume)
    }
  }

  // audioElement !== null && 
  // setInterval(() => {
  //   console.log(audioElement.duration)
  //   console.log(audioElement.currentTime)
  // }, 1000)

  useEffect(() => {
    setAudioElement(new Audio(Remix))
  }, [])

  return (
    <IconWrapper width={width} height={height}>
      <ShuffleRoundedIcon fontSize="small"/>
      <SkipPreviousRoundedIcon />
      {!isPlaying ? 
        <StylePlayCircleFilledRoundedIcon 
          // fontSize="large"
          color="color"
          onClick={testPlay}
        />
      :
        <StopCircleRoundedIcon onClick={testPlay}/>
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