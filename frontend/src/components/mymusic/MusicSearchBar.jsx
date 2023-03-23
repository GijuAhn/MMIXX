import { useState } from "react";
import styled from "styled-components";

const MusicSearchBar = () => {
  const [query, setQuery] = useState("");
  const onChange = (event) => {
    setQuery(event.target.value);
  };
  const resetQuery = () => {
    setQuery("");
  };
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(query);
    if (query === "") return;
  };
  return (
    <div><form onSubmit={onSubmit}>
    <Input
      type="text"
      value={query}
      onChange={onChange}
      placeholder="음악 제목으로 검색"
    />
    <Button type="button" onClick={resetQuery}>
      X
    </Button>
    <Button>검색아이콘</Button>
  </form></div>
  );
};

const Input = styled.input`
  background: transparent;
`;
const Button = styled.button`
  background: transparent;
`;

export default MusicSearchBar;
