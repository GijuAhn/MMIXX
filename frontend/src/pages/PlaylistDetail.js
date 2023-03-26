import styled from 'styled-components'

import { Wrapper, Header, DefaultBtn } from "components/Common";
import { useNavigate } from 'react-router-dom';

const PlaylistDetail = ({ playlistSeq }) => {
  const navigate = useNavigate();

  console.log(playlistSeq)
  return (
    <Wrapper>
      <Header 
        title="Playlist-Deatil"
        desc="상세페이지"
      />
      <Content>
        <DefaultBtn onClick={ () => navigate("/playlist/create")}>
          플레이리스트 수정
          <h1>{playlistSeq}</h1>
        </DefaultBtn>
      </Content>
    </Wrapper>
  );
};

const Content = styled.div`

`
export default PlaylistDetail;