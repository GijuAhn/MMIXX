import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

import { Wrapper, Header, DefaultBtn } from "components/Common";
import { MiniPlaylistCard } from 'components/Playlist';
import { useRecoilValue } from 'recoil';
import { testPlaylist } from 'atom/atom';
import { useEffect, useState } from 'react';
import { testApi } from 'api/playlist';

const Playlist = () => {
  const navigate = useNavigate();
  const playlists = useRecoilValue(testPlaylist)
  const [data, setData] = useState('')

  useEffect(() => {
    testApi()
      .then(res => setData(res))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    console.log('결과값 확인 : ', data) 
  }, [data]);

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
        <CardWrapper>
          {playlists.map((playlist, index) => {
            return (
              <MiniPlaylistCard 
                key={index} 
                playlist={playlist}
                onClick={() => navigate(`/playlist/${playlist.playlistSeq}`)}
                />
            )
          })}
        </CardWrapper>
      </Content>
    </StyleWrapper>
  );
};

const StyleWrapper = styled(Wrapper)`
  height: 100%;
  border: 1px solid aqua;
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