import { useState } from "react";
import styled from "styled-components";

const MusicSearchOrder = () => {
  const [index, setIndex] = useState("x");
  const onSelect = (event) => {
    setIndex(event.target.value);
    console.log(index);
    console.log(event.target.value);
    // if (event.target.value === "x") return;
    // if (index === "x") return;
  };
  return (
    <div><Select value={index} onChange={onSelect}>
    <option value="x">정렬</option>
    <optgroup label="제목">
      <option value="title1">ㄱㄴㄷ순</option>
      <option value="title2">ㅎㅍㅌ순</option>
    </optgroup>
    <optgroup label="업로드 날짜">
      <option value="date1">최신순</option>
      <option value="date2">오래된 순</option>
    </optgroup>
    <optgroup label="곡 길이">
      <option value="length1">짧은 순</option>
      <option value="length2">긴 순</option>
    </optgroup>
  </Select></div>
    // 제목 디폴트; 빈 아래 세모 누르면 아래 검은 세모 또 누르면 위 검은 세모
  );
};
const Select = styled.select`
  background: transparent;
`;
export default MusicSearchOrder;
