import { useState } from 'react'
import { VolumeUpRounded } from '@mui/icons-material'
import { VolumeDownRounded } from '@mui/icons-material'
import { Slider } from '@mui/material'

const VolumeControl = ({ audioElement }) => {
  const [ volume, setVolume ] = useState() 

  return (
    <>
      <VolumeDownRounded />
      <Slider
            aria-label="Volume"
            defaultValue={30}
            sx={{
              // color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
              '& .MuiSlider-track': {
                border: 'none',
              },
              '& .MuiSlider-thumb': {
                width: 24,
                height: 24,
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