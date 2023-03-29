import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import theme from 'styles/theme';

import styled from 'styled-components';
import { testPlaylistMusic } from 'atom/atom';
import { useRecoilValue } from 'recoil';

// 참조
// https://mui.com/material-ui/react-card/

const PresetCard = (props) => {
  const preset_name = props.preset_name
  // const preset_summary = props.preset_summary
  // const preset_info = props.preset_info
  // const preset_image = props.preset_image
  const tm = useTheme();

  const playlist = useRecoilValue(testPlaylistMusic)
  const { coverImage, musicName, musicianName } = playlist.playlistMusic[0].music

  return (
    <Card>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      `<CoverImage>
          <img src={coverImage} alt={musicName} />
      </CoverImage>
        <Content>
          <div style={{ color: `${theme.palette.secondary}`, fontSize: 35, fontWeight: 'bolder',justifyContent: 'flex-start' }}>
            { preset_name }
            {/* PRESET NAME */}
          </div>
          <div style={{ color: `${theme.palette.light}`, fontSize: 25, fontWeight: 'bold', justifyContent: 'flex-start' }}>
            { musicName }
          </div>
          <div style={{ color: `${theme.palette.light}`, fontWeight: 'normal',justifyContent: 'flex-start' }}>
            { musicianName }
          </div>
        </Content>
      </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {tm.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {tm.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
    </Card>
  );
}

export default PresetCard

const Card = styled.div`
  display: flex; 
  flex-direction: column;
  maxWidth: 500; 
  height: 300px; 
  border: 3px solid ${theme.palette.secondary};
  border-radius: 10px;
  background-color: ${theme.palette.dark};
  padding: 5px;
`
const CoverImage = styled.div`
  object-fit: cover;
  width: 370px;
  height: 200px;
  overflow: hidden;
  border-radius: 3px;

  img {
    width: 100%;
    height: 100%;
  }
`
const Content = styled.div`
 display: flex;
 flex-direction: column;
 padding: 10px
`