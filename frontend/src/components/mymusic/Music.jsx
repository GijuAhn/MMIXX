import { useState } from "react";
import styled from "styled-components";
import MusicList from "./MusicList";
import MusicSearchBar from "components/myMusic/MusicSearchBar";
import MusicUploadBtn from "components/myMusic/MusicUpload";
import { filterOptions, orderOptions } from "./options";
import Select from "./CustomSelect";

const Music = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState("");

  return (
    <DivBlock>
      <MusicSearchBar query={query} setQuery={setQuery}></MusicSearchBar>
      <Div>
        <MusicUploadBtn></MusicUploadBtn>
        <Select
          options={filterOptions}
          selectKind="필터"
          setSelect={setFilter}
        ></Select>
        <Select
          options={orderOptions}
          selectKind="정렬"
          setSelect={setOrder}
        ></Select>
      </Div>
      <MusicList filter={filter} order={order} query={query}></MusicList>
    </DivBlock>
  );
};
const DivBlock = styled.div`
  display: block;
`;
const Div = styled.div`
  // display: flex;
  justify-content: start;
  // padding: 30px 40px 30px;
`;
export default Music;
