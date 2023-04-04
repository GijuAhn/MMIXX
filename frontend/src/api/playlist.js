import instance from './base'


// 임시 테스트용 (고양이 사진 API)
export const testApi = async () => {
  return await instance('https://jsonplaceholder.typicode.com/posts/1')
}  
// 회원 플레이리스트 가져오기
export const getPlaylists = async (userSeq) => {
  return await instance(`/playlist/user/${userSeq}`)
}
// 해당 플레이리스트 상세 페이지
export const getPlaylistDetail = async ( playlistSeq ) => {
  return await instance(`/playlist/${playlistSeq}`)
}
// 플레이리스트 생성
export const postPlaylist = async (userSeq, playlist) => {
  console.log(playlist);
  return await instance.post(`/playlist/${userSeq}`,  playlist )
}
// 즐겨찾기한 플레이리스트 목록 조회
export const favoritePlaylists = async () => {
  return await instance('/playlist/favorite')
}
// 플레이리스트 대표 앨범커버 가져오기 (앨범아트가 없으면 default image 를 출력한다. (Error Code 404 처리 필요))
export const getPlaylistCoverImage = async ( playlistSeq ) => {
  return await instance(`/playlist/${playlistSeq}/1`)
}

export const insertMusicInPlaylist = async ( playlistSeq ) => {
  return await instance.post(`/playlist/${playlistSeq}`)
}
// 플레이리스트 삭제
export const deletePlaylist = async (playlistSeq) => {
  return await instance.delete(`/playlist/${playlistSeq}`)
}