import React, {useEffect} from 'react';
import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import theme from 'styles/theme';

import styled from 'styled-components';
import { testPlaylistMusic } from 'atom/atom';
import { useRecoilValue } from 'recoil';

const PresetCard = (props, {presetSeqFunc}) => {
  const preset_name = props.preset_name
  const presetSeq = props.presetSeq
  // const musicName = props.musicName
  // const musicianName = props.musicianName
  // const coverImage = props.coverImage

  const playlist = useRecoilValue(testPlaylistMusic)
  const { coverImage, musicName, musicianName } = playlist.playlistMusic[0].music
  
  useEffect(() => {
    console.log(props.selnum)
    if (props.selnum === presetSeq) {
      console.log('나야낭')
    } else {
      console.log('나 아니양')
    }
  }, [props.selnum])


  return (
    <Card onClick={() => props.presetSeqFunc(presetSeq) }>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <CoverImage>
          <img src={coverImage} alt={musicName} />
        </CoverImage>
        <Content>
          <div style={{ color: `${theme.palette.secondary}`, fontSize: 35, fontWeight: 'bolder', justifyContent: 'flex-start' }}>
            { preset_name }
          </div>
          <div style={{ color: `${theme.palette.light}`, fontSize: 25, fontWeight: 'bold', justifyContent: 'flex-start' }}>
            { musicName }
          </div>
          <div style={{ color: `${theme.palette.light}`, fontWeight: 'normal', justifyContent: 'flex-start' }}>
            { musicianName }
          </div>
          <div style={{ justifyContent: 'flex-start' }}>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
            {/* <PlayIcons /> */}
          </div>
        </Content>
      </Box>
    </Card>
  );
}

export default PresetCard

const Card = styled.div`
  display: flex; 
  flex-direction: column;
  width: 30vw; 
  height: 40vh; 
  border: 3px solid ${theme.palette.secondary};
  border-radius: 10px;
  background-color: ${theme.palette.dark};
  padding: 3vw;
`
const CoverImage = styled.div`
  object-fit: cover;
  width: 30vw;
  height: 25vh;
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
 padding-left: 3vw
`