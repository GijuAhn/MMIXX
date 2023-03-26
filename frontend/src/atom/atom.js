import { atom } from "recoil";

// export const isLogin = atom({
//   key: 'isLogin',
//   default: false,
// })

export const userInfo = atom({
  key: 'userInfo',
  default: null,
  name: 'John Smith'
})

export const testPlaylist = atom({
  key: 'testPlaylist',
  default: 
    [
      {
        musicName: 'OMG', 
        musicUrl: '',
        coverImage: './assets/cover_image.jpg',
        musicImage: 'assets/cover_image.jpg',
        musicianName: 'New Jeans',
        albumName: '앨범 제목',
        isFavorite: false,
      },
      {
        musicName: '사건의 지평선', 
        musicUrl: '',
        coverImage: 'https://image.bugsm.co.kr/album/images/500/40734/4073469.jpg',
        musicImage: '',
        musicianName: '윤하',
        albumName: '앨범 제목',
        isFavorite: true,
      },
      {
        musicName: '사건의 지평선', 
        musicUrl: '',
        coverImage: 'https://image.bugsm.co.kr/album/images/500/40734/4073469.jpg',
        musicImage: '',
        musicianName: '윤하',
        albumName: '앨범 제목',
        isFavorite: true,
      },
      {
        musicName: '사건의 지평선', 
        musicUrl: '',
        coverImage: 'https://image.bugsm.co.kr/album/images/500/40734/4073469.jpg',
        musicImage: '',
        musicianName: '윤하',
        albumName: '앨범 제목',
        isFavorite: true,
      },
    ]
})

// export const changeDefaultWidth = selector({
//   key: 'changeDefaultWidth',
//   get: ({get}) => { return get(defaultWidth) }
// })