import { atom, selector } from 'recoil'

import localStorageEffect from './_local'

export const _now = atom({
  key: '_now_playing',
  default: new Audio(),
  effects: [
    localStorageEffect('_now')
  ]
})

export const nowPlaylist = atom({
  key: 'nowPlaying',
  default: {
    coverImage: '',
    musicName: '',
    musicianName: ''
  },
  
})

export const _nowSelector = selector({
  key: '_nowSelector',
  get: ({ get }) => {
    const getNow = get(_now)
    // const nowMusic = playlist.filter((item) => item.playing)
    // const { coverImage, musicName, musicianName, musicUrl } = nowMusic[0]
    
    return {
      _now
      // nowMusic, 
      // coverImage,
      // musicName,
      // musicianName,
      // musicUrl
    }
  },
  set: ({ set }, newValue) => {
    // set(nowPlaying, newValue)
  },
  effects: [
    localStorageEffect('_test', 1)
  ]
})

export const playlistQueue = atom({
  key: 'Queue',
  default: []
})
