import { useRecoilState } from "recoil"

export const usePlayControl = () => {
  /**
   * 현재 진행중인 곡이 속해있는 리스트 가져오기
   */
  const [ queue, setQueue ] = useRecoilState()
  
  /**
   * 이 플레이리스트를 atom과 로컬에 저장하기
   * playing 키 값 추가
   */ 
  const saveRecoilPlaylist = (playlist, start = 0) => {
    const newPlaylist = playlist.map((item, index) => {
      if (start === index) {
        return { ...item, playing: true }
      } else {
        return { ...item, playing: false } 
      }
    })
    setQueue(newPlaylist)
  }

  return { queue, saveRecoilPlaylist }
}
