import styled, { keyframes, css } from "styled-components"
import { getPlaylistCoverImage } from "api/playlist"
import { useEffect, useState } from "react"
import FavoriteIcon from '@mui/icons-material/Favorite'; // 하트
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // 빈 하트
import { InsightsOutlined } from "@mui/icons-material";

const MiniPlaylistCard = ({ playlist, onClick }) => {
  const { playlistName } = playlist
  const [coverImage, setCoverImg] = useState('')
  const [isOverflowed, setIsOverflowed] = useState(false);

  console.log(isOverflowed)
  useEffect(() => {
    const playlistTitle = document.querySelector('.title');
    if (playlistTitle) {
      setIsOverflowed(playlistTitle.offsetWidth < playlistTitle.scrollWidth);
    }
  }, [playlistName]);

  useEffect(() => {
    getPlaylistCoverImage(playlist.playlistSeq)
      .then(res => {
      // console.log(res);
      setCoverImg(res.data);
    })
  }, []); 

  return (
    <CardWrapper
      coverImage={coverImage} 
      onClick={onClick}
      isOverflowed={isOverflowed}
      >
      <StyledFavoriteBorderIcon />
      <PlaylistTitle className="title">
        {playlistName}
      </PlaylistTitle>
    </CardWrapper>
  )
}

const marquee = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
`

const CardWrapper = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 5px;
  background-size: cover;
  // justify-content: end;
  // align-items: end;
  cursor: pointer;
  background-image: url(${({coverImage}) => coverImage});
  overflow: hidden;
  position: relative;

  &:hover {
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.6) 90%),
      url(${({coverImage}) => coverImage});
    transform: scale(1.1);
    transition: transform 0.3s ease-out;
    
  }
  ${({isOverflowed}) => {
    isOverflowed && css`
    p {
      animation: ${marquee} 5s linear infinite
    }`
  }}
  `

const StyledFavoriteBorderIcon = styled(FavoriteBorderIcon)`
  position: absolute;
  top: 0;
  right: 0;
`

const PlaylistTitle = styled.p`
  border: 1px dotted pink;
  align-self: end;
  padding: 15px;
  position: absolute;
  left: 10px;
  color: ${({theme}) => theme.palette.light};
  font-size: 24px;
  letter-spacing: -1px;
  font-style: italic;
  white-space: nowrap; // 텍스트 줄바꿈 방지
  // overflow: hidden; // 넘치는 부분을 숨김
  text-overflow: ellipsis;
  transform: translateY(100%);
  transition: transform 0.3s ease-out;

  ${CardWrapper}:hover & {
    transform: translateY(0);
  }
`

export default MiniPlaylistCard