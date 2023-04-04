import { useState, useEffect } from "react"
import styled, { css } from "styled-components"
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import AlbumIcon from '@mui/icons-material/Album'
import { Switch } from '@mui/material'
import { useRecoilValue } from 'recoil'
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';

import { Wrapper, Header, DefaultBtn } from "components/Common"
import { testPlaylistMusic } from 'atom/atom'
import { getPlaylistDetail, deletePlaylist } from "api/playlist"
import {CustomTable} from "components/mymusic"

const PlaylistDetail = () => {
  const navigate = useNavigate()
  const { playlistSeq } = useParams()
  const [data, setData] = useState(null)

  const { state } = useLocation();
  const playlistTitle = state.playlistTitle;
  // console.log(playlistTitle);

  // console.log('params', playlistSeq);
  const [playlistMusic, setPlayListMusic] = useState([]);
  const [coverImage, setCoverImage] = useState(null)

  // 플레이리스트 음악 목록 가져오기
  useEffect(() => {
    getPlaylistDetail(playlistSeq)
      .then(res => {
        // console.log(res);
        setPlayListMusic(res.data);
        return res.data
      })
      .then(res => {
        // console.log(res);
        setCoverImage(res[0].coverImage);
      })
  }, []);

  // 플레이리스트 삭제 시작
  const useConfirm = (message = null, onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") {
      return;
    }
    if (onCancel && typeof onCancel !== "function") {
      return;
    }
  
    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      } else {
        onCancel();
      }
    };
  
    return confirmAction;
  };
  const deleteConfirm = () => {
    deletePlaylist(playlistSeq)
      .then(res => {
        // alert('삭제되었습니다.')
        navigate('/playlist')
      })
  }
  const cancelConfirm = () => console.log("취소했습니다.");
  const confirmDelete = useConfirm(
    "삭제하시겠습니까?",
    deleteConfirm,
    cancelConfirm
  );
  // 플레이리스트 삭제 끝

  return (
    <StyleWrapper url={coverImage}>
      <Header 
        title="플레이리스트 상세 보기"
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
              <p>{playlistTitle}</p>
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
            <DefaultBtn onClick={confirmDelete}>
              플레이리스트 삭제
            </DefaultBtn>
            <DefaultBtn onClick={() => navigate("/playlist/edit")}>
              플레이리스트 수정
            </DefaultBtn>           
          </Bottom>
        </RightContent>
      </InfoContent>

      <CustomTable musicList={ playlistMusic }/>        
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
  
  & p {
    color: ${({theme}) => theme.palette.alt};
    background-color: transparent;
    font-size: 50px;
    font-weight: 800;
    border: none;
    width: 100%;
    margin: 0;
    padding: 0;
    
    :focus {
      outline: none;
  }
`

const PrivateToggle = styled.div`
  font-weight: light;
  display: inline-block;
`

export default PlaylistDetail;
