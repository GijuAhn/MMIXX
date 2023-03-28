import base from './base'

const instance = base({
  url: '/playlist'
})

export const getPlaylists = async () => {
  return await instance()
}

export const getPlaylistDetail = async (playlistSeq) => {
  return await instance({
    params: {
      playlistSeq
    }
  })
}

// export const testApi = async () => {
//   return await instance()
// }  