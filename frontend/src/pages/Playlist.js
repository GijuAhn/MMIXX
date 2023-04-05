import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { Wrapper, Header, DefaultBtn } from "components/Common";
import { MiniPlaylistCard } from 'components/Playlist';
import { userInfo } from 'atom/atom';
import { getPlaylists, favoritePlaylists, globalPlaylists } from 'api/playlist';

const Playlist = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [playlistType, setType] = useState('');
  const mine = 'mine';
  const global = 'global';
  const favorite = 'favorite';
  const atomUser = useRecoilValue(userInfo)

  useEffect(() => {
    
    if (location.pathname.includes(global)) { // 글로벌 플레이리스트
      globalPlaylists(atomUser.userSeq)
        .then(
          res => {
            setData(res.data)
            return res.data
          }
          , setType(global)
      ).catch(err => console.log(err))
      
    } else if (location.pathname.includes(favorite)) { // 즐겨찾기한 플레이리스트
      favoritePlaylists(atomUser.userSeq)
        .then(
          res => {
            setData(res.data)
            return res.data
          }
          , setType(favorite)
      ).catch(err => console.log(err))
    } else { // 내 플레이리스트
      getPlaylists(atomUser.userSeq)
        .then(
          res => {
            setData(res.data)
            return res.data
          }
          , setType(mine)
      ).catch(err => console.log(err))
    }
      
  }, [location, atomUser]);


  return (
    <StyleWrapper>
      {playlistType === mine ? (
        <Header
          title="My Playlist"
          desc="내 플레이리스트"
        />
      ) : (
         playlistType === global ? (
          <Header
            title="Global Playlist"
            desc="글로벌 플레이리스트"
          />
        ) : (
          <Header
            title="Favorite Playlist"
            desc="즐겨찾기 플레이리스트"
          />    
      ))
      }
      <Content>
        <Top>
          {playlistType === mine ? (
            <DefaultBtn
              onClick={() => navigate("/playlist/create")}
              width="150px">
              플레이리스트 추가
            </DefaultBtn>
          ) : (
              <> </>
          )}
        </Top>
        {data != null && data.length > 0 ?
          <>
            <CardWrapper>
            
              {data.map((playlist, index) => {
                return (
                  <MiniPlaylistCard
                    key={index}
                    index={index}
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
          <div>플레이리스트가 없습니다.</div>
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
  margin-bottom: 100px;
`

const Top = styled.div`
  justify-content: end;
  margin-bottom: 10px;

  & > button:first-child {
    margin-right: 15px;
  }
`

const CardWrapper = styled.div`
  // border: 1px solid pink;
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 25px; 
  justify-items: center;
  align-items: center;
`

export default Playlist;