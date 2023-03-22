// import { useState } from "react";
import styled from "styled-components";
// import temp_img from "assets/logo.png";

const MusicListItem = ({
  musicSeq,
  coverImage,
  musicName,
  musicianName,
  albumName,
  musicLength,
  musicUrl,
  mixed,
  edited,
}) => {
  const onClick = () => {};
  const onMouseOver = () => {};
  return (
    <MusicItemBlock onClick={onClick} onMouseOver={onMouseOver}>
      <img
        src={coverImage === "assets/logo.png" ? null : coverImage}
        alt=""
      ></img>
      {/* <img
        src={coverImage === "assets/logo.png" ? temp_img : coverImage}
        alt=""
      ></img> */}
      <span>{null}</span>
      <span>{musicName}</span>
      <span>{musicianName}</span>
      <span>{albumName}</span>
      <span>
        {Math.floor((musicLength * 1000) / 60)}:{(musicLength * 1000) % 60}
      </span>
    </MusicItemBlock>
  );
};

// const Body = styled.div`
//   width: ${(props) => window.innerWidth - 300}px;
//   border: 1px solid blue;
//   position: fixed;
//   right: 0;
//   bottom: 0;
//   height: 150px;
//   filter: drop-shadow(0px -25px 100px rgba(16, 16, 16, 0.51));
// `;

const MusicItemBlock = styled.div`
  display: flex;
`;

export default MusicListItem;
