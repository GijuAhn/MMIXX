// import { useState } from "react";
import styled from "styled-components";
// import temp_img from "assets/logo.png";
// import PropTypes from "prop-types";
import MusicIcon from "./MusicIcon";

const MusicListItem = ({
  musicSeq,
  coverImage,
  mixed,
  musicName,
  musicianName,
  albumName,
  musicLength,
  // musicUrl,
  // edited,
}) => {
  // const onClick = () => {
  //   console.log("...musicSeq:", musicSeq);
  // };
  // const onMouseOver = () => {};
  return (
    // <MusicItemBlock onClick={onClick} onMouseOver={onMouseOver}>
    // </MusicItemBlock>
    // <tr className={styles.row} onClick={onClick} onMouseOver={onMouseOver}>
    // <tr onClick={onClick} onMouseOver={onMouseOver}>
    <Tr>
      <td>
        {/* <img src={coverImage === null ? temp_img : coverImage} alt=""></img> */}
        <img src={coverImage} alt=""></img>
      </td>
      <td>{mixed === null ? null : "M"}</td>
      <td>{musicName}</td>
      <td>{musicianName}</td>
      <td>{albumName}</td>
      <td>
        {Math.floor(musicLength / 1000 / 60)}:
        {Math.floor((musicLength / 1000) % 60)}
      </td>
      <td>
        <MusicIcon musicSeq={musicSeq} iconName={"play"}></MusicIcon>
      </td>
      <td>
        <MusicIcon musicSeq={musicSeq} iconName={"mix"}></MusicIcon>
      </td>
      <td>
        <MusicIcon musicSeq={musicSeq} iconName={"download"}></MusicIcon>
      </td>
    </Tr>
  );
};
// MusicListItem.propTypes = {
//   text: PropTypes.string.isRequired,
//   fontSize: PropTypes.number,
//   key: PropTypes.string.isRequired,
//   coverImage: PropTypes.string.isRequired,
//   musicName: PropTypes.string.isRequired,
//   musicianName: PropTypes.string.isRequired,
//   albumName: PropTypes.string.isRequired,
//   musicLength: PropTypes.string.isRequired,
//   mixed: PropTypes.string.isRequired,
// };

const Tr = styled.tr`
  background-color: ${({ theme }) => theme.palette.darkgray};
  &:hover {
    background-color: ${({ theme }) => theme.palette.hover};
  }
`;
// const Td = styled.td`
//   &td:first-child {
//     border-radius: 10px 0 0 10px;
//   }
//   &td:last-child {
//     border-radius: 10px 0 0 10px;
//   }
// `;
// background-color: #2d3032;
// opacity: 0.5; // -> 자식들까지 투명도 적용된다. (글자까지)

// darkgray: 2D3032 인데 투명이 50
// hover: 되면 2D3032
// radius 15

export default MusicListItem;
