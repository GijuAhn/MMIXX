import { useState } from "react";
import styled from "styled-components";

const MusicSearchFilter = () => {
  const [index, setIndex] = useState("x");
  const onSelect = (event) => {
    setIndex(event.target.value);
    // console.log(index); // 제대로 안찍힘. setIndex 비동기? 라서 그런감
    // console.log(event.target.value); // 제대로 값 찍힌다.
    // if (event.target.value === "x") return;
    // if (index === "x") return;
  };
  return (
    <div><Select value={index} onChange={onSelect}>
    <option value="x">필터</option>
    <option value="all">모든 음악</option>
    <option value="mix">믹스 음악</option>
    <option value="origin">원본 음악</option>
  </Select></div>
  );
};
const Select = styled.select`
  background: transparent;
`;
export default MusicSearchFilter;
