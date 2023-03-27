import { useState } from "react";
import { Wrapper, Header } from "components/Common";
import { MusicSearchBar, MusicUpload, MusicList } from "components/mymusic";
import { CustomSelect } from "components/mymusic";
import { filterOptions, orderOptions } from "components/mymusic/options";
import styled from "styled-components";

const MyMusic = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState("");

  return (
    <Wrapper>
      <Header title="My Music" desc="내 음악 들어보기" />
      <Content>
        <DivRight>
          <MusicSearchBar query={query} setQuery={setQuery}></MusicSearchBar>
        </DivRight>
      </Content>

      <Content>
        <MusicUpload></MusicUpload>
        <DivRight>
          <CustomSelect
            options={filterOptions}
            selectKind="필터"
            setSelect={setFilter}
          ></CustomSelect>
          <CustomSelect
            options={orderOptions}
            selectKind="정렬"
            setSelect={setOrder}
          ></CustomSelect>
          {/* <DefaultBtn>즐겨찾기</DefaultBtn> */}
        </DivRight>
      </Content>

      <MusicList filter={filter} order={order} query={query}></MusicList>
      {/* <Music></Music> */}
    </Wrapper>
  );
};

// const DivBlock = styled.div`
//   display: block;
// `;
const Content = styled.div`
  width: 1100px;
  flex-direction: column;
`;

const Div = styled.div`
  // display: flex;
  // justify-content: start;
  // padding: 30px 40px 30px;
`;
const DivRight = styled.div`
  justify-content: end;
  margin-right: 15px;
  // margin-bottom: 10px;
  // & > button:first-child {
  //   margin-right: 15px;
  // }
`;

export default MyMusic;
