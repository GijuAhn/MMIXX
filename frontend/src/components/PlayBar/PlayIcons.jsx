import styled from 'styled-components'
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import StopCircleRoundedIcon from '@mui/icons-material/StopCircleRounded';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import RepeatOneRoundedIcon from '@mui/icons-material/RepeatOneRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';


const PlayIcons = () => {
  return (
    <IconWrapper>
      <PlayCircleFilledRoundedIcon />
      <StopCircleRoundedIcon />
      <ShuffleRoundedIcon />
    </IconWrapper>
  )
}

const IconWrapper = styled.div`
  border: 1px solid red;
`

export default PlayIcons;