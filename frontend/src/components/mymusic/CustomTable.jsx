import styled from "styled-components";
import DefaultCoverImage from "assets/default-cover-image.jpg";
import Play from "./MusicPlayIcon";
import Mix from "./MusicMixIcon";
import Extract from "./MusicExtractIcon";
import Download from "./MusicDownloadIcon";

import unCheck from "assets/check.png";
import Check from "assets/check-selected.png";
import { useRef } from "react";

const CustomTable = ({
  musicList,
  hasIcon = true,
  radio = false,
  checkRadio,
  checkBox = false,
  checkMusicList,
}) => {
  const musicSeq = useRef(null);
  const coverImage = useRef(null);
  const musicName = useRef(null);
  const musicianName = useRef(null);
  // const [musicSeqState, setMusicSeqState] = useState(-1);

  const checkedList = useRef([]);

  const onCheck = (event) => {
    if (radio) {
      musicSeq.current =
        event.target.attributes.getNamedItem("seq") === null
          ? null
          : event.target.attributes.getNamedItem("seq").value;
      coverImage.current =
        event.target.attributes.getNamedItem("cover") === null
          ? null
          : event.target.attributes.getNamedItem("cover").value;
      musicName.current =
        event.target.attributes.getNamedItem("title") === null
          ? null
          : event.target.attributes.getNamedItem("title").value;
      musicianName.current =
        event.target.attributes.getNamedItem("musician") === null
          ? null
          : event.target.attributes.getNamedItem("musician").value;

      // setMusicSeqState(musicSeq.current);

      // console.log(
      //   musicSeq.current,
      //   coverImage.current,
      //   musicName.current,
      //   musicianName.current
      // );

      checkRadio({
        musicSeq: musicSeq.current,
        coverImage: coverImage.current,
        musicName: musicName.current,
        musicianName: musicianName.current,
      });
    } else if (checkBox) {
      // console.log(event.target.src);
      // console.log(unCheck);
      // console.log(Check);

      if (event.target.src.includes("check-selected")) {
        event.target.setAttribute("src", unCheck);
      } else {
        event.target.setAttribute("src", Check);
      }

      const newMusicSeq =
        event.target.attributes.getNamedItem("seq") === null
          ? null
          : event.target.attributes.getNamedItem("seq").value;

      const deletedIndex = checkedList.current.findIndex(
        (item) => item.musicSeq === newMusicSeq
      );

      // console.log("deletedIndex", deletedIndex);
      if (deletedIndex === -1) {
        // console.log("추가!");
        checkedList.current.push({
          music_seq: newMusicSeq,
          sequence: newMusicSeq,
        });
      } else {
        // console.log("삭제!");
        checkedList.current.splice(deletedIndex, 1);
      }
      // console.log(checkedList.current);
      checkMusicList(checkedList.current);
    }
  };
  return (
    <Table>
      <tbody>
        {musicList.map((music) => (
          <Tr key={music.musicSeq}>
            {radio || checkBox ? (
              <Radio>
                <img
                  onClick={onCheck}
                  seq={music.musicSeq}
                  cover={music.coverImage}
                  title={music.musicName}
                  musician={music.musicianName}
                  src={musicSeq.current == music.musicSeq ? Check : unCheck}
                  alt=''
                  width='23'
                />
              </Radio>
            ) : null}
            <TdRound>
              <CoverImage
                coverImage={
                  music.coverImage === null
                    ? DefaultCoverImage
                    : music.coverImage
                }
              ></CoverImage>
            </TdRound>
            <Td weight='400'>
              {/* {music.mixed !== null ? "M" : music.edited !== null ? "Ⅰ" : null} */}
              M i I Inst. inst. Ⅰ
            </Td>
            <Td>
              {music.musicName.includes(".")
                ? music.musicName.substr(0, music.musicName.lastIndexOf("."))
                : music.musicName}
            </Td>
            <Td>
              {music.musicianName === null ||
              music.musicianName.replace(/\s/g, "").length === 0
                ? "-"
                : music.musicianName}
            </Td>
            <Td>
              {music.albumName === null ||
              music.albumName.replace(/\s/g, "").length === 0
                ? "-"
                : music.albumName}
            </Td>
            <Td>
              {Math.floor(music.musicLength / 1000 / 60)}:
              {String(Math.floor((music.musicLength / 1000) % 60)).padStart(
                2,
                "0"
              )}
            </Td>
            {!radio && !checkBox ? (
              <Td>
                <Play musicSeq={music.musicSeq}></Play>
              </Td>
            ) : null}
            {!radio && !checkBox ? (
              <Td>
                <Mix
                  musicSeq={music.musicSeq}
                  musicName={music.musicName.substr(
                    0,
                    music.musicName.lastIndexOf(".")
                  )}
                  coverImage={music.coverImage}
                  musicianName={music.musicianName}
                ></Mix>
              </Td>
            ) : null}
            {!radio && !checkBox ? (
              <Td>
                <Extract musicSeq={music.musicSeq}></Extract>
              </Td>
            ) : null}
            {!radio && !checkBox ? (
              <Td>
                <Download musicSeq={music.musicSeq}></Download>
              </Td>
            ) : null}
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

const CoverImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8.5px;
  background-image: url(${({ coverImage }) => coverImage});
  background-size: cover;
  justify-content: start;
  align-items: end;
`;

const Table = styled.table`
  // display: block;
  border-collapse: separate;
  border-spacing: 0 10px;
  width: 85%;
  font-size: 14px;
  font-weight: 400;
  // font-family: "Heebo", sans-serif;
`;

const Tr = styled.tr`
  background-color: ${({ theme }) => theme.palette.darkgray};
  &:hover {
    background-color: ${({ theme }) => theme.palette.hover};
  }
  // padding: 20px;
  height: 65px;
  // font-family: "Heebo", sans-serif;
`;

const Radio = styled.td`
  background-color: ${({ theme }) => theme.palette.darkAlt};
`;

const TdRound = styled.td`
  // background-color: green;
  border-radius: 15px 0 0 15px;
`;

const Td = styled.td`
  // background-color: green;
  font-size: 14px;
  font-weight: ${(props) => props.weight || "200"};
  font-family: "Heebo", sans-serif;
  // &:first-child {
  //   border-radius: 15px 0 0 15px;
  //   // margin-left: 10px;
  // }
  &:last-child {
    border-radius: 0 15px 15px 0;
  }
`;

export default CustomTable;
