import { useState, useEffect, useRef } from 'react'
import Slider from '@mui/material/Slider';
import { usePlayControl } from 'hooks/usePlayControl';

const PlaySlider = () => {
  const { audioElement, isPlaying, nowMusic } = usePlayControl()
  const [ position, setPosition ] = useState(0)
  const sliderRef = useRef(null)

  const formatDuration = (value) => {
    const minute = Math.floor(value / 60)
    const secondLeft = value - minute * 60
    return `${minute} : ${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`
  }

  setInterval(() => {
    console.log(parseInt(audioElement.currentTime))
    const newCurrentTime = parseInt(audioElement.currentTime)
    if (position !== newCurrentTime) {
      setPosition(newCurrentTime)
    }
  }, 1000)

  useEffect(() => {
    console.log(nowMusic)
    audioElement.src = nowMusic.musicUrl
  }, [])

  return (
    <Slider
      aria-label="time-indicator"
      size="small"
      ref={sliderRef}
      value={position}
      // value={0}
      max={nowMusic.musicLength}
      onChange={(_, value) => setPosition(value)}
      sx={{
        // color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
        height: 4,
        '& .MuiSlider-thumb': {
          width: 8,
          height: 8,
          transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
          '&:before': {
            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
          },
          '&:hover, &.Mui-focusVisible': {
            // boxShadow: `0px 0px 0px 8px ${
            //   theme.palette.mode === 'dark'
            //     ? 'rgb(255 255 255 / 16%)'
            //     : 'rgb(0 0 0 / 16%)'
            // }`,
          },
          '&.Mui-active': {
            width: 20,
            height: 20,
          },
        },
        '& .MuiSlider-rail': {
          opacity: 0.28,
        },
      }}
    />
  )
}

export default PlaySlider;