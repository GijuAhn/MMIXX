// import { useState } from "react";
import styled from "styled-components";
// import temp_img from "assets/logo.png";
// import PropTypes from "prop-types";
import DownloadIcon from "./MusicDownloadIcon";
import MixIcon from "./MusicMixIcon";
import PlayIcon from "./MusicPlayIcon";

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
      <Td>
        [img]
        {/* <img src={coverImage === null ? temp_img : coverImage} alt=""></img> */}
        {/* <img src={coverImage} alt=""></img> */}
      </Td>
      <Td>{mixed === null ? null : "M"}</Td>
      <Td>{musicName}</Td>
      <Td>{musicianName}</Td>
      <Td>{albumName}</Td>
      <Td>
        {Math.floor(musicLength / 1000 / 60)}:
        {Math.floor((musicLength / 1000) % 60)}
      </Td>
      {/* <td style="display:none"> */}
      <Td>
        <PlayIcon musicSeq={musicSeq}></PlayIcon>
      </Td>
      <Td>
        <MixIcon musicSeq={musicSeq}></MixIcon>
      </Td>
      <Td>
        <DownloadIcon musicSeq={musicSeq}></DownloadIcon>
      </Td>
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
const Td = styled.td`
  &:first-child {
    border-radius: 15px 0 0 15px;
  }
  &:last-child {
    border-radius: 0 15px 15px 0;
  }
`;

export default MusicListItem;
