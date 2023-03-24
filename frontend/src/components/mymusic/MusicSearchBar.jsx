import { useState } from "react";
import styled from "styled-components";

const MusicSearchBar = ({ setQuery, goSearch }) => {
  const [input, setInput] = useState("");
  const onChange = (event) => {
    setInput(event.target.value);
  };
  const resetInput = () => {
    setInput("");
  };
  const onSubmit = (event) => {
    event.preventDefault();
    // console.log(query);
    // if (input === "" || input.replace(/\s/g, "") === "") return;
    setQuery(input);
    goSearch(true);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          value={input}
          onChange={onChange}
          placeholder="음악 제목으로 검색"
        />
        <Button type="button" onClick={resetInput}>
          X
        </Button>
        <Button>검색아이콘</Button>
      </form>
    </div>
  );
};

const Input = styled.input`
  background: transparent;
`;
const Button = styled.button`
  background: transparent;
`;

export default MusicSearchBar;
