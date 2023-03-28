import instance from './base'

export const getPlaylists = async () => {
  return await instance({
    url: '/playlist'
  })
}

export const getPlaylistDetail = async (playlistSeq) => {
  return await instance({
    url: '/playlist',
    params: {
      playlistSeq
    }
  })
}

// export const testApi = async () => {
//   return await instance()
// }  