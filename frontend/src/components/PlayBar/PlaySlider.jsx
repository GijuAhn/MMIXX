import { useState, useEffect } from 'react'
import Slider from '@mui/material/Slider';

// 1. 마우스가 바를 선택하고 놨을 때 지정된 값부터 노래를 다시 재생한다 -> 노래가 시작되는 순서?! 
// 2. 노래가 재생되는 동안 그 진행되는 시간을 가져와서 playbar의 value에 반영하면 되지 않나???????

const PlaySlider = ({ audioState }) => {
  const [audio, setAudio] = useState({
    // currentTime: audioState.currentTime,
    // volume: audioState.volume
    currentTime: 10,
    volume: 0.5
  })

  useEffect(() => {
    console.log(audio)
  }, [audioState])

  return (
    <Slider
      aria-label="time-indicator"
      size="small"
      value={10}
      min={0}
      step={1}
      max={200}
      // onChange={(_, value) => setPosition(value)}
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