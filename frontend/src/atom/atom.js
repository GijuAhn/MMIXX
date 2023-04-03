import { atom } from "recoil";

import newJeansImage from "assets/cover_image.jpg"
import Cupid from "assets/music/Cupid (Twin Ver.).mp3"
import localStorageEffect from './_local'

export const isLogIn = atom({
  key: 'isLogIn',
  default: false,//localStorage.getItem('isLogin')==true ? true : false,
  effects: [
    localStorageEffect('isLogin')
  ]
})

export const userInfo = atom({
  key: 'userInfo',
  default: [], //localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  effects: [
    localStorageEffect('user')
  ]
})

export const testPlaylist = atom({
  key: 'testPlaylist',
  default: 
    [
      { 
        playlistSeq: 1,
        userSeq: 'ABC',
        musicName: 'OMG', 
        musicUrl: '',
        coverImage: newJeansImage,
        musicImage: 'assets/cover_image.jpg',
        musicianName: 'New Jeans',
        playlistName: '뉴진스 노래 제목',
        isFavorite: false,
        isPrivate: false,
      },
      {
        playlistSeq: 2,
        userSeq: 'DEF',
        musicName: 'FLOWER', 
        musicUrl: '',
        coverImage: 'https://image.bugsm.co.kr/album/images/500/40734/4073469.jpg',
        musicImage: '',
        musicianName: '지수',
        playlistName: '지수 앨범',
        isFavorite: true,
        isPrivate: false,
      },
      {
        playlistSeq: 3,
        userSeq: 'GHI',
        musicName: 'Cupid', 
        musicUrl: Cupid,
        coverImage: 'https://preview.redd.it/fifty-fifty-the-1st-single-album-the-beginning-cupid-cover-v0-ujxvn57yg5ka1.jpg?auto=webp&s=464bef37a60cd8b6b2d0c607ecea65be3c4e85b8',
        musicImage: '',
        musicianName: 'FIFTY FIFTY',
        playlistName: '케이팝노래',
        isFavorite: true,
        isPrivate: false,
      },
      {
        playlistSeq: 4,
        userSeq: 'XYZ',
        musicName: 'OMG', 
        musicUrl: '',
        coverImage: 'https://images.genius.com/78a260dddd0b802059eb5e7a4d4f2f0c.1000x1000x1.jpg',
        musicImage: '',
        musicianName: '뉴진스',
        playlistName: '뉴진스 앨범 제목 !',
        isFavorite: false,
        isPrivate: false,
      },
    ]
})

export const testPlaylistMusic = atom({
  key: 'testPlaylistMusic',
  default: {
    playlistSeq: 1, 
    playlistName: '뉴진스 노래 모음',
    playlistMusic: [
      {
        musicSeq: 1,
        sequence: 1,
        music: {
          userSeq: 'ABS', 
          musicName: 'OMG',
          coverImage: newJeansImage,
          musicLength: 100,
          musicianName: 'New Jeans',
          albumName: '뉴진스 앨범',
          mixed: 0,
          edited: 0
       }
      },
      {
        musicSeq: 2,
        sequence: 2,
        music: {
          userSeq: 'ABS', 
          musicName: 'New Jeans',
          coverImage: newJeansImage,
          musicLength: 100,
          musicianName: 'New Jeans',
          albumName: '뉴진스 앨범',
          mixed: 0,
          edited: 0
       }
      },
      {
        musicSeq: 3,
        sequence: 3,
        music: {
          userSeq: 'ABS', 
          musicName: 'New Jeans',
          coverImage: newJeansImage,
          musicLength: 100,
          musicianName: 'New Jeans',
          albumName: '뉴진스 앨범',
          mixed: 0,
          edited: 0
       }
      },
      {
        musicSeq: 4,
        sequence: 4,
        music: {
          userSeq: 'ABS', 
          musicName: 'New Jeans',
          coverImage: newJeansImage,
          musicLength: 100,
          musicianName: 'New Jeans',
          albumName: '뉴진스 앨범',
          mixed: 0,
          edited: 0
       }
      },
      {
        musicSeq: 5,
        sequence: 5,
        music: {
          userSeq: 'ABS', 
          musicName: 'New Jeans',
          coverImage: newJeansImage,
          musicLength: 100,
          musicianName: 'New Jeans',
          albumName: '뉴진스 앨범',
          mixed: 0,
          edited: 0
       }
      }
    ]
  }
})
// export const changeDefaultWidth = selector({
//   key: 'changeDefaultWidth',
//   get: ({get}) => { return get(defaultWidth) }
// })