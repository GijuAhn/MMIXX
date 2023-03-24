import styled from 'styled-components'

import { Wrapper, Header, DefaultBtn } from "components/Common";

const Playlist = () => {
  return (
    <Wrapper>
      <Header 
        title="PLAYLIST"
        desc="내 플레이리스트 모아보기"
      />
      <Content>
        <DefaultBtn>플레이리스트 추가</DefaultBtn>
      </Content>
    </Wrapper>
  );
};

const Content = styled.div`

`
export default Playlist;