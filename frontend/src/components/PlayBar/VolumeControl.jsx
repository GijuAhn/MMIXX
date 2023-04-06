import { useEffect } from 'react'
import { VolumeUpRounded } from '@mui/icons-material'
import { VolumeDownRounded } from '@mui/icons-material'
import { Slider } from '@mui/material'
import { volumeState } from 'atom/music'
import { usePlayControl } from 'hooks/usePlayControl'
import { useRecoilState } from 'recoil'

const VolumeControl = () => {
  const { audioElement } = usePlayControl()  
  const [ volume, setVolume ] = useRecoilState(volumeState)

  useEffect(() => {
    audioElement.volume = volume
  }, [volume])

  return (
    <>
      <VolumeDownRounded />
      <Slider
        aria-label="Volume"
        value={volume}
        max={1}
        step={0.1}
        onChange={(_, value) => setVolume(value)}
        sx={{
          width: 100,
          // color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
          '& .MuiSlider-track': {
            border: 'none',
          },
          '& .MuiSlider-thumb': {
            width: 10,
            height: 10,
            backgroundColor: '#fff',
            '&:before': {
              boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
            },
            '&:hover, &.Mui-focusVisible, &.Mui-active': {
              boxShadow: 'none',
            },
          },
        }}
      />
      <VolumeUpRounded />
    </>
  )
}

export default VolumeControl;