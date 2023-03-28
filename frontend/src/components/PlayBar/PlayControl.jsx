import styled from 'styled-components'
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
// import StopCircleRoundedIcon from '@mui/icons-material/StopCircleRounded';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import RepeatOneRoundedIcon from '@mui/icons-material/RepeatOneRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';


const PlayControl = ({ width, height, isPlaying }) => {
  return (
    <IconWrapper width={width} height={height}>
      <ShuffleRoundedIcon fontSize="small"/>
      <SkipPreviousRoundedIcon />
      <StylePlayCircleFilledRoundedIcon 
        fontSize="large"
        color="color"
      />
      {/* <StopCircleRoundedIcon /> */}
      <SkipNextRoundedIcon />
      <RepeatOneRoundedIcon />
    </IconWrapper>
  )
}

const IconWrapper = styled.div`
  width: ${({width}) => width ? width: 'auto'};
  height: ${({height}) => height ? height: 'auto'};
  border: 1px solid red;
  justify-content: space-around;
  
  * {
    border: 1px dotted pink;
  }
`

const StylePlayCircleFilledRoundedIcon = styled(PlayCircleFilledRoundedIcon)`
  color: ${({color, theme}) => color ? theme.palette.secondary : 'red'};
  transition: all 0.1s ease-in-out;
    
    &:hover {
      transform: scale(1.1);
      cursor: pointer;
    }
`

export default PlayControl;