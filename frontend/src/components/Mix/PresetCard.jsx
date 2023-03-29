import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import theme from 'styles/theme';

import styled from 'styled-components';
import { testPlaylistMusic } from 'atom/atom';
import { useRecoilValue } from 'recoil';
import { Padding } from '@mui/icons-material';

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
      `<CoverImage>
          <img src={coverImage} alt={musicName} />
      </CoverImage>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'grid', padding: 2}}>
          <div style={{ color: `${theme.palette.secondary}`, fontSize: 25, fontWeight: 'bold', justifyContent: 'flex-start' }}>
            { preset_name }
            {/* PRESET NAME */}
          </div>
          <div style={{ color: `${theme.palette.light}`, fontWeight: 'bolder', justifyContent: 'flex-start' }}>
            { musicName }
          </div>
          <div style={{ color: `${theme.palette.light}`, fontWeight: 'normal',justifyContent: 'flex-start' }}>
            { musicianName }
          </div>
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
      </Box>
    </Card>
  );
}

export default PresetCard

const Card = styled.div`
  display: flex; 
  maxWidth: 500; 
  height: 300px; 
  border: 3px solid ${theme.palette.secondary};
  background-color: ${theme.palette.darkgray};
  border-radius: 10px;
  padding: 5px;
  transparent: 0
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