import { useState } from "react";
import styled from "styled-components";
import MusicSearchBar from "components/myMusic/MusicSearchBar";
import MusicSearchFilter from "components/myMusic/MusicSearchFilter";
import MusicSearchOrder from "components/myMusic/MusicSearchOrder";

const MusicSearch = () => {
  //   const [index, setIndex] = useState("x");
  //   const onSelect = (event) => {
  //     setIndex(event.target.value);
  //     // console.log(index); // 제대로 안찍힘. setIndex 비동기? 라서 그런감
  //     // console.log(event.target.value); // 제대로 값 찍힌다.
  //   };
  return (
    <div>
      <MusicSearchBar></MusicSearchBar>
     <MusicSearchFilter></MusicSearchFilter>
      <MusicSearchOrder></MusicSearchOrder>
    </div> 
  );
};

export default MusicSearch;
