import { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from "recoil"

import { nowPlayingSelector } from "atom/music"

const usePlayControl = (props) => {
  const { data, sequence } = props
  const contoroller = useSetRecoilState(nowPlayingSelector)

  const newData = data.filter((_, index) => sequence === index)
  contoroller(newData[0])
}

export { usePlayControl }