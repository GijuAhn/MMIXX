import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import styled from 'styled-components';

// 참조
// https://mui.com/material-ui/react-card/

const styles = {
  image : {
    margin:10,
  }
}

const PresetCard = (props) => {
  // const preset_name = props.preset_name
  // const preset_summary = props.preset_summary
  // const preset_info = props.preset_info
  const preset_image = props.preset_image
  const theme = useTheme();
  return (
    <Card sx={{ display: 'flex', maxWidth: 345}}>
      {/* 프리셋 이미지 */}
      <CardMedia        
        style={styles.image}  
        component="img"
        sx={{ width: 151 }}
        image={ preset_image }
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography component="div" variant="h5">
            {/* { preset_name } */}
            PRESET NAME
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {/* { preset_summary } */}
            PRESET_SUMMARY
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            {/* { preset_info } */}
            PRESET_INFO
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}

export default PresetCard

const ContentWrapper = styled.div`
  
`