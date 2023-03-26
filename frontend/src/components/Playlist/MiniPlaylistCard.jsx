import styled from "styled-components"

const MiniPlaylistCard = ({ playlist }) => {
  const { coverImage, albumName, musicName } = playlist

  console.log(coverImage)
  return (
    <CardWrapper coverImage={coverImage}>
      <img src="src/assets/cover_image.jpg" alt="" />
    </CardWrapper>
  )
}

const CardWrapper = styled.div`
  width: 250px;
  height: 250px;
  border: 1px dashed cornsilk;
  background-image: url(${({ coverImage }) => coverImage});
  // background-image: url('https://image.bugsm.co.kr/album/images/500/40734/4073469.jpg');
  background-size: cover;
`


export default MiniPlaylistCard