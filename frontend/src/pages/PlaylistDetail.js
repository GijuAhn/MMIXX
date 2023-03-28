import { useState, useEffect } from "react"
import styled, { css } from "styled-components"
import { useNavigate } from 'react-router-dom'
import AlbumIcon from '@mui/icons-material/Album'
import { Switch } from '@mui/material'
import { useRecoilValue } from 'recoil'
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';

import { Wrapper, Header, DefaultBtn } from "components/Common"
import { testPlaylistMusic } from 'atom/atom'
import { getPlaylistDetail } from "api/playlist"

const PlaylistDetail = () => {
  const navigate = useNavigate()

  // 임시 데이터
  // const location = useLocation()
  // const playlistSeq = location.pathname.split('/')[2]
  const { 
    playlistName, 
    playlistMusic
  } = useRecoilValue(testPlaylistMusic)
  const [coverImage, setCoverImage] = useState(null)

  useEffect(() => {
    getPlaylistDetail()
  }, [])

  useEffect(() => {
    setCoverImage(playlistMusic[0].music.coverImage)
  }, [playlistMusic])

  return (
    <StyleWrapper url="">
      <Header 
        title="플레이리스트 상세 보기2"
        desc=""
        fontSize="24px"
      />
      <InfoContent>
        <PlaylistCover coverImage={coverImage}>
          {!coverImage &&
            <AlbumIcon color="white" fontSize="large"/>
          }
        </PlaylistCover>
        <RightContent>
          <Top>
            <PlaylistTitle>
              <input type="text" defaultValue={playlistName}></input>
            </PlaylistTitle>
            <PrivateToggle>
              공개여부
              <Switch defaultChecked/>
            </PrivateToggle>
          </Top>
          <Bottom>
            <PlayCircleFilledRoundedIcon 
              fontSize="large"
            />
            <DefaultBtn onClick={() => navigate("/playlist/edit")}>
              플레이리스트 수정
            </DefaultBtn>
          </Bottom>
        </RightContent>
      </InfoContent>

    </StyleWrapper>
  );
};

const StyleWrapper = styled(Wrapper)`
  ${({theme, url}) => css`
    background-image: linear-gradient(to bottom left, rgba(0, 0, 0, 0.8), ${theme.palette.darkAlt} 70%), url(${url});
    background-size: cover;
  `}
`

const InfoContent = styled.div`
  height: 350px;
  width: 1100px;
  overflow: hidden;
  display: grid;
  padding: 0px 10px;
  grid-template-columns: 300px 700px;
  gap: 30px;
  justify-content: start;
`

const PlaylistCover = styled.div`
  width: 300px;
  height: 300px;
  background-color: ${({theme, coverImage}) => coverImage || theme.palette.dark};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({coverImage}) => 
    coverImage && `
    background-image: url(${coverImage});
    background-size: cover;
  `}
` 

const RightContent = styled.div`
  width: 700px;
  height: 300px;
  display: flex;
  flex-direction: column;
`

const Top = styled.div`
  flex-direction: column;
  flex-grow: 4;
  align-items: start;
`

const Bottom = styled.div`
  flex-grow: 1;
  justify-content: start;
  align-items: end;
`

const PlaylistTitle = styled.div`
  color: #fff;
  font-size: 45px;
  font-weight: bold;
  
  & input {
    color: ${({theme}) => theme.palette.alt};
    background-color: transparent;
    font-size: 50px;
    font-weight: 800;
    border: none;
    width: 100%;
    
    :focus {
      outline: none;
  }
`

const PrivateToggle = styled.div`
  font-weight: light;
  display: inline-block;
`

export default PlaylistDetail;
