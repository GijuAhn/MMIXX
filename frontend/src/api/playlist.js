import instance from './base'

// 임시 테스트용 (고양이 사진 API)
export const testApi = async () => {
  return await instance('https://jsonplaceholder.typicode.com/posts/1')
}  

export const getPlaylists = async () => {
  return await instance('/playlist')
}

export const getPlaylistDetail = async ( playlistSeq ) => {
  return await instance(`/playlist/${playlistSeq}`)
}

export const postPlaylist = async ( playlist ) => {
  return await instance.post('/playlist', { data: playlist })
}

export const favoritePlaylists = async () => {
  return await instance('/playlist/favorite')
}

export const getPlaylistCoverImage = async ( playlistSeq ) => {
  return await instance(`/playlist/${playlistSeq}/1`)
}

export const insertMusicInPlaylist = async ( playlistSeq ) => {
  return await instance.post(`/playlist/${playlistSeq}`)
}