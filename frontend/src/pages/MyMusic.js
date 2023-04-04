import { useState } from "react";
import { Wrapper, Header } from "components/Common";
import { MusicSearchBar, MusicUploadBtn, MusicList } from "components/mymusic";
import { CustomSelect } from "components/mymusic";
import { filterOptions, orderOptions } from "components/mymusic/options";
import styled from "styled-components";

const MyMusic = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState("");

  // // [Test] 곡 선택하기 (radio)
  // const [selectedMusic, setSelectedMusic] = useState({
  //   musicSeq: null,
  //   coverImage: null,
  //   musicName: null,
  //   musicianName: null,
  // });

  // // [Test] 곡 선택하기 (check box)
  // const [checkedList, setCheckedList] = useState([]);

  return (
    <Wrapper>
      <div>
        <Header title='My Music' desc='내 음악 들어보기' />
        <SearchBarSection>
          <MusicSearchBar query={query} setQuery={setQuery} />
        </SearchBarSection>
      </div>
      <Div>
        <section>
          <MusicUploadBtn />
        </section>
        <SelectSection>
          <CustomSelect options={filterOptions} selectKind='필터' setSelect={setFilter} />
          <CustomSelect options={orderOptions} selectKind='정렬' setSelect={setOrder} />
        </SelectSection>
      </Div>

      <MusicList filter={filter} order={order} query={query} />

      {/* [Test] 곡 선택하기 (radio) */}
      {/* {selectedMusic.musicSeq}
      {selectedMusic.coverImage}
      {selectedMusic.musicName}
      {selectedMusic.musicianName}
      <MusicList radio={true} checkMusic={setSelectedMusic}></MusicList> */}

      {/* [Test] 여러 곡 선택하기 (check box) */}
      {/* <button onClick={() => console.log(checkedList)}>추가하기</button>
      <MusicList checkBox={true} checkMusicList={setCheckedList}></MusicList> */}
    </Wrapper>
  );
};

// const DivRight = styled.div`
//   justify-content: end;
//   margin-right: 15px;
//   // margin-bottom: 10px;
//   // & > button:first-child {
//   //   margin-right: 15px;
//   // }
// `;

const Div = styled.div`
  // border: 1px dotted green;
  justify-content: space-between;
  width: 87%;
  margin: 10px auto 20px auto;
`;

const SearchBarSection = styled.section`
  margin-top: 20px;
  margin-right: 83px;
  // border: 1px dotted green;
`;

const SelectSection = styled.section`
  display: flex;
`;

export default MyMusic;
