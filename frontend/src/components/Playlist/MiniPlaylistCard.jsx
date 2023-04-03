import styled from "styled-components"

const MiniPlaylistCard = ({ playlist, onClick }) => {
  const { coverImage, playlistName } = playlist

  return (
    <CardWrapper coverImage={coverImage} onClick={onClick}>
      <PlaylistTitle>
        {playlistName}
      </PlaylistTitle>
    </CardWrapper>
  )
}

const CardWrapper = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 5px;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.6) 90%),
    url(${({coverImage}) => coverImage});
  background-size: cover;
  justify-content: end;
  align-items: end;
  cursor: pointer;
`
const PlaylistTitle = styled.p`
  padding: 15px;
  color: ${({theme}) => theme.palette.light};
  font-size: 24px;
  letter-spacing: -1px;
  font-style: italic;
`

export default MiniPlaylistCard