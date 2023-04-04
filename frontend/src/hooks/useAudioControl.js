import { useEffect } from 'react'
import { useRecoilValue } from "recoil"

import { _now } from "atom/music"

export const useAudioControl = () => {
  const audioElement = useRecoilValue(_now)

  useEffect(() => {
    // audioElement.u
  }, [])
  return { audioElement }
}