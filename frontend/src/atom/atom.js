import { atom } from "recoil";

import newJeansImage from "assets/cover_image.jpg"

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
        coverImage: newJeansImage,
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
        musicName: 'Cupid', 
        musicUrl: '',
        coverImage: 'https://preview.redd.it/fifty-fifty-the-1st-single-album-the-beginning-cupid-cover-v0-ujxvn57yg5ka1.jpg?auto=webp&s=464bef37a60cd8b6b2d0c607ecea65be3c4e85b8',
        musicImage: '',
        musicianName: 'FIFTY FIFTY',
        albumName: '앨범 제목',
        isFavorite: true,
      },
      {
        musicName: 'OMG', 
        musicUrl: '',
        coverImage: 'https://images.genius.com/78a260dddd0b802059eb5e7a4d4f2f0c.1000x1000x1.jpg',
        musicImage: '',
        musicianName: '뉴진스',
        albumName: '앨범 제목',
        isFavorite: false,
      },
    ]
})

// export const changeDefaultWidth = selector({
//   key: 'changeDefaultWidth',
//   get: ({get}) => { return get(defaultWidth) }
// })