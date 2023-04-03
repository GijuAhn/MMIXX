import instance from './base'
// import { useRecoilValue } from 'recoil';
// import { isLogIn, test, userInfo } from 'atom/atom';

// const atomIsLogin = useRecoilValue(isLogIn)
// const atomUser = useRecoilValue(userInfo)

//   // console.log(atomTest)
//   const isLogin =
//     atomIsLogin
//     // localStorage.getItem("isLogin") && localStorage.getItem("isLogin") == "true"
//       ? true
//       : false;

//   const user = atomUser
//     // localStorage.getItem("user")
//     ? JSON.parse(localStorage.getItem("user"))
//     : null;

// 임시 테스트용 (고양이 사진 API)
export const testApi = async () => {
  return await instance('https://jsonplaceholder.typicode.com/posts/1')
}  

export const getPlaylists = async () => {
  return await instance('/playlist')
}

export const getPlaylistDetail = async ( playlistSeq ) => {
  return await instance(`/music/${playlistSeq}`)
}

export const postPlaylist = async (playlist) => {
  console.log(playlist);
  return await instance.post(`/playlist/6`, { data: playlist })
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