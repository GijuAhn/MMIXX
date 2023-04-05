import React, { useEffect } from 'react';
import styled from 'styled-components'
import Box from '@mui/material/Box';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PlaySlider } from 'components/PlayBar';
import { _mix_now } from 'atom/music';
import theme from 'styles/theme.jsx';
// import ColorThief from '../../../node_modules/colorthief/dist/color-thief.mjs'

// const colorThief = new ColorThief();
const ResultCard = (props) => {
  const musicUrl = props.musicUrl
  const musicName = props.musicName
  const musicianName = props.musicianName
  const coverImage = props.coverImage
  const isResult = props.isResult

  // useEffect(() => {
  //   if (coverImage.complete){
  //     colorThief.getColor(coverImage)
  //   } else {
  //     console.log('difesdklfjsijdlkjfsldeifjdsklfjiedsjl')
  //   }
  // },[])
  
  const [ mixPlay ] = useRecoilState(_mix_now)
   
   const handleMixPlay = () => {
     mixPlay.src = props.musicUrl
     mixPlay.play()
   }
  return (
      <Card isResult={isResult}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <CoverImage>
          <img src={ coverImage } alt={ musicName } />
        </CoverImage>
        <Content>
          <div style={{ color: `${theme.palette.light}`, fontSize: '2.5vw', fontWeight: 'bold', justifyContent: 'flex-start' }}>
            { musicName }
          </div>
          <div style={{ color: `${theme.palette.light}`, fontSize: '1vw', fontWeight: 'normal', justifyContent: 'flex-start' }}>
            { musicianName }
          </div>
        </Content>
        </Box>
        <MusicPlayer>
          <PlaySlider />
          <PlayCircleFilledRoundedIcon onClick={handleMixPlay}/>
        </MusicPlayer>
      </Card>
  )
}

export default ResultCard

const Card = styled.div`
  display: flex;
  flex-direction: row;
  flex-direction: column;
  border: 3px solid ${props => (props.isResult ? theme.palette.secondary : theme.palette.light)};
  border-radius: 10px;
  width: 30vw;
  height: 30vh;
  padding: 10px;
`
const Content = styled.div`
  display: flex;
  flex-direction: column; 
  padding-left: 3vw;
  align-items: center;
  pl: 1;
  pb: 1;
`

const CoverImage = styled.div`
  object-fit: cover;
  width: 17vw;
  height: 20vh;
  overflow: hidden;
  border-radius: 1vw;
  img {
    width: 100%;
    height: 100%;
  }
`
const MusicPlayer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: 'flex-start';
  margin: 1px;
`