import { useEffect } from 'react'
import { useRecoilState } from "recoil"

import { nowPlayingSelector } from "atom/music"

const usePlayControl = (props) => {
  const { data, sequence } = props
  const newData = data.filter((item, index) => sequence === index)
  localStorage.setItem('playlists', JSON.stringify(data))
  localStorage.setItem('playlist', JSON.stringify(newData))
}

export { usePlayControl }