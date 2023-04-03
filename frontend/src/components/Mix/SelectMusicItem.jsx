import styled from "styled-components";
import DefaultCoverImage from "assets/default-cover-image.jpg";
import Play from "../mymusic/MusicPlayIcon";
import Mix from "../mymusic/MusicMixIcon";
import Extract from "../mymusic/MusicExtractIcon";
import Download from "../mymusic/MusicDownloadIcon";
import theme from "styles/theme";

// { props, hasIcon = true }
const SelectMusicItem = (props,{hasIcon = true }) => {
  // console.log('props : ',props.music["music"].musicName)
  const music = props.music['music']
  return (
    <MusicItem>
      <CoverImage
        // coverImage={
        //   music.coverImage === null
        //     ? DefaultCoverImage
        //     : music.coverImage
        // }
      ><img src={music.coverImage=== null ? DefaultCoverImage : music.coverImage}/></CoverImage>
      <MusicContent>
        <p>{music.musicName}</p>
        {/* <p style={{ color:`${theme.palette.light}` }}>{music.musicName.substr(0, music.musicName.lastIndexOf("."))}</p> */}
      </MusicContent>
      <MusicContent>
        <p>{music.musicianName}</p>
        {/* {music.musicianName === null ||
        music.musicianName.replace(/\s/g, "").length === 0
          ? "-"
          : music.musicianName} */}
      </MusicContent>
      <MusicContent>
        <p>{music.albumName}</p>
        {/* {music.albumName === null ||
        music.albumName.replace(/\s/g, "").length === 0
          ? "-"
          : music.albumName} */}
      </MusicContent>
      <MusicContent>
        {/* <p>{music.musicLength}</p> */}
        <p>{Math.floor(music.musicLength / 1000 / 60)}:
        {String(Math.floor((music.musicLength / 1000) % 60)).padStart(
          2,
          "0"
        )}</p>
      </MusicContent>
      <Icons>

      {hasIcon ? (
        <MusicContent>
          <Play musicSeq={music.musicSeq}></Play>
        </MusicContent>
      ) : null}
      {hasIcon ? (
        <MusicContent>
          <Mix musicSeq={music.musicSeq}></Mix>
        </MusicContent>
      ) : null}
      {hasIcon ? (
        <MusicContent>
          <Extract musicSeq={music.musicSeq}></Extract>
        </MusicContent>
      ) : null}
      {hasIcon ? (
        <MusicContent>
          <Download musicSeq={music.musicSeq}></Download>
        </MusicContent>
      ) : null}
      </Icons>
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
  border-radius: 5px;
`
const CoverImage = styled.div`
  object-fit: cover;
  width: 15vw;
  height: 5vh;
  overflow: hidden;
  border-radius: 0.3vw;

  img {
    width: 100%;
    height: 100%;
  }
`;
const MusicContent = styled.div`
  align-items: center;
  color: ${theme.palette.light}
`
const Icons = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 3vw;
`