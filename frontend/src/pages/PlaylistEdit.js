import styled, { css } from "styled-components"
import React from 'react'
import { useRecoilValue } from "recoil";
import AlbumIcon from '@mui/icons-material/Album';

import { Wrapper, Header, DefaultBtn } from "components/Common"
import { tempMusic } from "atom/atom";

const PlaylistEdit = () => {
  const playlist = useRecoilValue(tempMusic)
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    inputRef.current.select();
  }, [])

  console.log(playlist)
  return (
    <StyleWrapper url="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8&w=1000&q=80">
      <Header 
        title="New Playlist"
        desc="플레이리스트 수정임ㅋ"
      />
      <InputContent>
        <DefaultCover coverImage={playlist.coverImage}>
          <AlbumIcon colo="white" fontSize="large"/>
        </DefaultCover>
        <InputRight>
          <InputTitle>
            <input type="text" ref={inputRef} autoFocus defaultValue="#플레이리스트 제목"onFocus={() => this.select()}></input>
          </InputTitle>
          <DefaultBtn>
            곡 추가
          </DefaultBtn>
        </InputRight>
      </InputContent>
    </StyleWrapper>
  );
};

const StyleWrapper = styled(Wrapper)`
  ${({theme, url}) => css`
    background-image: linear-gradient(to bottom left, rgba(0, 0, 0, 0.7), ${theme.palette.dark} 70%), url(${url});
    background-size: cover;
  `}
`

const InputContent = styled.div`
  height: 350px;
  width: 1100px;
  overflow: hidden;
  display: grid;
  padding: 0px 10px;
  grid-template-columns: 300px 700px;
  gap: 30px;
  justify-content: start;
`

const DefaultCover = styled.div`
  width: 300px;
  height: 300px;
  background-color: ${({theme}) => theme.palette.dark};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
` 

const InputRight = styled.div`
  width: 700px;
  flex-direction: column;
  align-items: start;

  * {
    margin: 10px 0;
  }
`

const InputTitle = styled.div`
  color: #fff;
  font-size: 50px;
  font-weight: bold;
  justify-content: start;

  & input {
    color: #fff;
    background-color: transparent;
    font-size: 50px;
    font-weight: 800;
    border: none;
    border-bottom: 1px solid white;
    
    :focus {
      outline: none;
  }
`
export default PlaylistEdit;