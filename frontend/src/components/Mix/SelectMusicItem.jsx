import styled from "styled-components";
import DefaultCoverImage from "assets/default-cover-image.jpg";
import Play from "../mymusic/MusicPlayIcon";
import Mix from "../mymusic/MusicMixIcon";
import Extract from "../mymusic/MusicExtractIcon";
import Download from "../mymusic/MusicDownloadIcon";
import theme from "styles/theme";

// { props, hasIcon = true }
const SelectMusicItem = (props,{hasIcon = true }) => {
  console.log('props : ',props.music)
  return (
    <MusicItem>
      <CoverImage
        coverImage={
          props.music.coverImage === null
            ? DefaultCoverImage
            : props.music.coverImage
        }
      ></CoverImage>
      <MusicContent>
        {props.music.musicName}
        {/* {props.music.musicName.substr(0, props.music.musicName.lastIndexOf("."))} */}
      </MusicContent>
      <MusicContent>
        {props.music.musicianName}
        {/* {props.music.musicianName === null ||
        props.music.musicianName.replace(/\s/g, "").length === 0
          ? "-"
          : props.music.musicianName} */}
      </MusicContent>
      <MusicContent>
        {props.music.albumName}
        {/* {props.music.albumName === null ||
        props.music.albumName.replace(/\s/g, "").length === 0
          ? "-"
          : props.music.albumName} */}
      </MusicContent>
      <MusicContent>
        {props.music.musicLength}
        {/* {Math.floor(props.music.musicLength / 1000 / 60)}:
        {String(Math.floor((props.music.musicLength / 1000) % 60)).padStart(
          2,
          "0"
        )} */}
      </MusicContent>
      {hasIcon ? (
        <MusicContent>
          <Play musicSeq={props.music.musicSeq}></Play>
        </MusicContent>
      ) : null}
      {hasIcon ? (
        <MusicContent>
          <Mix musicSeq={props.music.musicSeq}></Mix>
        </MusicContent>
      ) : null}
      {hasIcon ? (
        <MusicContent>
          <Extract musicSeq={props.music.musicSeq}></Extract>
        </MusicContent>
      ) : null}
      {hasIcon ? (
        <MusicContent>
          <Download musicSeq={props.music.musicSeq}></Download>
        </MusicContent>
      ) : null}
    </MusicItem>
  )
}
export default SelectMusicItem

const MusicItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: ${theme.palette.hover};
  margin: 3px;
  margin-left: 3px;
  // border: 1px solid white;
  border-radius: 5px;
`
const CoverImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8.5px;
  background-image: url(${({ coverImage }) => coverImage});
  background-size: cover;
  justify-content: start;
  align-items: end;
`;
const MusicContent = styled.div`
  align-items: center;
  color: ${theme.palette.light}
`