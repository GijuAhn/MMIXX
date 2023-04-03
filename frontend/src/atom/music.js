import { atom, selector } from 'recoil'

import Flower from "assets/music/JISOO - 꽃(FLOWER) MV.mp3"
import Kitsch from "assets/music/IVE 아이브 Kitsch MV.mp3"
import Cupid from "assets/music/Cupid (Twin Ver.).mp3"
import AEOM from "assets/music/All Eyes On Me.mp3"
import localStorageEffect from './_local'

export const nowPlaying = atom({
  key: 'nowPlaying',
  default: {
    coverImage: '',
    musicName: '',
    musicianName: ''
  },
  effects: [
    localStorageEffect('playlist')
  ]
})

export const nowPlayingSelector = selector({
  key: 'nowPlayingSelector',
  get: ({ get }) => {
    const playlist = get(nowPlaying)
    // const nowMusic = playlist.filter((item) => item.playing)
    // const { coverImage, musicName, musicianName, musicUrl } = nowMusic[0]
    
    return {
      playlist
      // nowMusic, 
      // coverImage,
      // musicName,
      // musicianName,
      // musicUrl
    }
  },
  set: ({ set }, newValue) => {
    set(nowPlaying, newValue)
  }
})

export const playlistQueue = atom({
  key: 'playlistQueue',
  default: [
      {
        musicSeq: 1,
        sequence: 1,
        userSeq: 10,
        musicName: 'Kitsch',
        musicUrl: Kitsch,
        musicianName: 'IVE',
        coverImage: 'https://i.scdn.co/image/ab67616d0000b273204170c6b0db3a42030c5f75',
      },
      {
        musicSeq: 2,
        sequence: 2,
        userSeq: 10,
        musicName: 'Flower',
        musicUrl: Flower,
        musicianName: 'JISOO',
        coverImage: 'https://cdnimg.melon.co.kr/cm2/album/images/112/14/411/11214411_20230330163342_1000.jpg?a44a4efc5bab060475dc80a1993d2d65/melon/quality/80/optimize',
      },
      {
        musicSeq: 3,
        sequence: 3,
        userSeq: 10,
        musicName: 'Cupid',
        musicUrl: Cupid,
        musicianName: 'FIFTY FIFTY',
        coverImage: 'https://preview.redd.it/fifty-fifty-the-1st-single-album-the-beginning-cupid-cover-v0-ujxvn57yg5ka1.jpg?auto=webp&s=464bef37a60cd8b6b2d0c607ecea65be3c4e85b8',
      },
      {
        musicSeq: 4,
        sequence: 4,
        userSeq: 10,
        musicName: 'AEOM',
        musicUrl: AEOM,
        musicianName: 'JISOO',
        coverImage: 'https://cdnimg.melon.co.kr/cm2/album/images/112/14/411/11214411_20230330163342_1000.jpg?a44a4efc5bab060475dc80a1993d2d65/melon/quality/80/optimize',
      }
    ]
})

