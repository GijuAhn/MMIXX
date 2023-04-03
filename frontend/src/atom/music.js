import { atom, selector} from 'recoil'

export const nowPlaying = atom({
  key: 'nowPlaying',
  default: [],
})

export const nowPlayingMusic = selector({
  key: 'nowPlayingMusic',
  get: ({ get }) => {
    const music = get(nowPlaying).map((item, i) => {
      return {
        ...item,
        isPlaying: false,
      }
    })
  }
})