import { useRecoilState } from "recoil"

import { playlistQueue } from "atom/music"

export const usePlayControl = () => {
  /**
   * 현재 진행중인 곡이 속해있는 리스트 가져오기
   */
  const [ queue, setQueue ] = useRecoilState(playlistQueue)
  
  /**
   * 이 플레이리스트를 atom과 로컬에 저장하기
   * playing 키 값 추가
   */ 
  const createNowPlaylist = (playlist) => {
    const newPlaylist = playlist.map((item, index) => {
      if (index === 0) {
        return { ...item, playing: true }
      } else {
        return { ...item, playing: false } 
      }
    })
    setQueue(newPlaylist)
    localStorage.setItem('_queue', JSON.stringify(newPlaylist))
  } 


  return { queue, createNowPlaylist }
}


// export const useNowPlaying = () => {
//   const [audio] = useState(new Audio());

//   const { playlist, playNext } = useNowPlaylist();

//   useEffect(() => {
//     const handleEnded = () => {
//       playNext();
//     };

//     audio.addEventListener('ended', handleEnded);

//     return () => {
//       audio.removeEventListener('ended', handleEnded);
//     };
//   }, [audio, playNext]);

//   useEffect(() => {
//     const nowMusic = playlist.find((item) => item.playing);

//     if (nowMusic) {
//       audio.src = nowMusic.musicUrl;
//       audio.play();
//     } else {
//       audio.pause();
//     }
//   }, [playlist, audio]);

//   return { audio };
// };
