import styled from "styled-components";
import DefaultCoverImage from "assets/default-cover-image.jpg";
import Play from "./MusicPlayIcon";
import Mix from "./MusicMixIcon";
import Extract from "./MusicExtractIcon";
import Download from "./MusicDownloadIcon";

const CustomTable = ({ musicList, hasIcon = true }) => {
  return (
    <Table>
      <tbody>
        {musicList.map((music) => (
          <Tr key={music.musicSeq}>
            <Td>
              <CoverImage
                coverImage={
                  music.coverImage === null
                    ? DefaultCoverImage
                    : music.coverImage
                }
              ></CoverImage>
            </Td>
            <Td weight="400">
              {/* {music.mixed === null || music.mixed === 0 ? null : "M"} */}
            </Td>
            <Td>
              {music.musicName.substr(0, music.musicName.lastIndexOf("."))}
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
            {hasIcon ? (
              <Td>
                <Play musicSeq={music.musicSeq}></Play>
              </Td>
            ) : null}
            {hasIcon ? (
              <Td>
                <Mix musicSeq={music.musicSeq}></Mix>
              </Td>
            ) : null}
            {hasIcon ? (
              <Td>
                <Extract musicSeq={music.musicSeq}></Extract>
              </Td>
            ) : null}
            {hasIcon ? (
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

const Td = styled.td`
  font-size: 14px;
  font-weight: ${(props) => props.weight || "200"};
  font-family: "Heebo", sans-serif;
  &:first-child {
    border-radius: 15px 0 0 15px;
    // margin-left: 10px;
  }
  &:last-child {
    border-radius: 0 15px 15px 0;
  }
`;

export default CustomTable;
