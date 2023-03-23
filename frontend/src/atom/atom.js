import { atom } from "recoil";

export const isLogin = atom({
  key: 'isLogin',
  default: false,
})

export const userInfo = atom({
  key: 'userInfo',
  default: null,
  name: 'John Smith'
})

// export const changeDefaultWidth = selector({
//   key: 'changeDefaultWidth',
//   get: ({get}) => { return get(defaultWidth) }
// })