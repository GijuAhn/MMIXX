import instance from './base'

// 임시 테스트용 (고양이 사진 API)
export const testApi = async () => {
  return await instance({
    headers: {
      timeout: 2500,
    }
  })
}  

export const getPlaylists = async () => {
  return await instance()
}

export const getPlaylistDetail = async (playlistSeq) => {
  return await instance({
    url: `/${playlistSeq}`
  })
}

export const postPlaylist = async (playlist) => {
  return await instance.post({
    url: 'playlist',
    data: {
      playlist
    }
  })
}

export const favoritePlaylists = async () => {
  return await instance({
    url: '/playlist/favorite'
  })
}

export const getPlaylistCoverImage = async (playlistSeq) => {
  return await instance({
    url: `/playlist/${playlistSeq}/1`
  })
}

export const insertMusicInPlaylist = async (playlistSeq) => {
  return await instance.post({
    url: `/playlist/${playlistSeq}`
  })
}