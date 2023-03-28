import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const MusicInfo = (props) => {
  const music_name = props.music_name
  const music_singer = props.music_singer
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            { music_name }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { music_singer }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MusicInfo