import { atom, selector } from "recoil";

export const defaultWidth = atom({
  key: 'defaultWidth',
  default: window.innerWidth - 300,
})

export const changePlaybarWidth = selector({
  key: 'changePlaybarWidth',
  get: ({get}) => { return get(defaultWidth) }
})
