import { _nowSelector } from "atom/music"
import { useRecoilState } from "recoil"

const usePlayControl = ( _nowPlaylist ) => {
  const [ _queue, setQueue ] = useRecoilState(_nowSelector)

  setQueue(_nowPlaylist)
}

export default usePlayControl