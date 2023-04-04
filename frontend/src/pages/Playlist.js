import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

import { Wrapper, Header, DefaultBtn } from "components/Common";
import { MiniPlaylistCard } from 'components/Playlist';
import { useRecoilValue } from 'recoil';
import { testPlaylist, isLogIn, userInfo } from 'atom/atom';
import { useEffect, useState } from 'react';
import { getPlaylists } from 'api/playlist';

const Playlist = () => {
  const navigate = useNavigate();
  const playlists = useRecoilValue(testPlaylist)
  const [data, setData] = useState(null)

  const atomIsLogin = useRecoilValue(isLogIn)
  const atomUser = useRecoilValue(userInfo)

  useEffect(() => {
    // getPlaylists(atomUser.userSeq)
    getPlaylists(10)
      .then(
        res => {
          setData(res.data)
          return res.data
        }
    )
      .catch(err => console.log(err))
  }, []);


  return (
    <StyleWrapper>
      <Header 
        title="My Playlist"
        desc="내 플레이리스트 모아보기"
      />
      <Content>
        <Top>
          <DefaultBtn 
            white
            width="150px">
            즐겨찾기
          </DefaultBtn>
          <DefaultBtn 
            onClick={ () => navigate("/playlist/create")}
            width="150px">
            플레이리스트 추가
          </DefaultBtn>
        </Top>
        {data != null ?
          <>
            <CardWrapper>
            
              {data.map((playlist, index) => {
                return (
                  <MiniPlaylistCard
                    key={index}
                    playlist={playlist}                   
                    onClick={() => navigate(`/playlist/${playlist.playlistSeq}`, {
                      state : {
                        playlistTitle: `${playlist.playlistName}`,
                        isPrivate: `${playlist.isPrivate}`,
                      } 
                      })}
                  />
                )
              })}
          
            </CardWrapper>
          </> :
          <button></button>
        }
      </Content>
    </StyleWrapper>
  );
};

const StyleWrapper = styled(Wrapper)`
  height: 100%;
`

const Content = styled.div`
  width: 1100px;
  flex-direction: column;
`

const Top = styled.div`
  justify-content: end;
  margin-bottom: 10px;

  & > button:first-child {
    margin-right: 15px;
  }
`

const CardWrapper = styled.div`
  margin-top: 15px;
  flex-wrap: wrap;
  justify-content: space-between
`

export default Playlist;