import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from "recoil"

import { _now, audioState, playlistQueue } from "atom/music"

export const usePlayControl = () => {
  /**
   * 현재 진행중인 곡이 속해있는 리스트 가져오기
   */
  const audioElement = useRecoilValue(audioState)
  const [ nowMusic, setNow ] = useRecoilState(_now)
  const [ queue, setQueue ] = useRecoilState(playlistQueue)

  /**
   * 이 플레이리스트를 atom과 로컬에 저장하기
   * playing 키 값 추가
   */ 
  const createNowPlaylist = async ( playlist, start = 0 ) => {
    const newPlaylist = await playlist.map((item, index) => {
      if (index === start) {
        // const newItem = {...item, playing: true}
        return { ...item, playing: true }
      } else {
        return { ...item, playing: false } 
      }
    })
    localStorage.setItem('_queue', JSON.stringify(newPlaylist))
    setQueue(newPlaylist)
  } 

  /**
   * 현재 실행될 음악값 설정
   */
  const createNowMusic = () => {
    console.log('2')
    const newNowMuisc = queue.find((item) => item.playing)
    if (newNowMuisc) {
      if (audioElement.src || !audioElement.paused) {
        audioElement.pause()
      }
      audioElement.src = newNowMuisc.musicUrl
      localStorage.setItem('_now', JSON.stringify(newNowMuisc))
      setNow(newNowMuisc)
    }
  }

  /**
   * NowMusic에 값이 생기면 노래 재생하기 
   */
  const playMusic = () => {
    if (audioElement.src) {
    }
  }

  /**
   * 다음 노래 재생하기 
   */
  const playNext = ( onShuffle = false ) => {
    const currentIndex = queue.findIndex((item) => item.playing)
    const queueLength = queue.length
    let nextIndex = -1
    if (onShuffle) {
      nextIndex = Math.floor(Math.random() * queueLength)

    } else {
      nextIndex = currentIndex + 1
    }
    queue[currentIndex].playing = false
    queue[nextIndex].playing = true
  }

  useEffect(() => {
    createNowMusic()
  }, [queue])
 
  useEffect(() => {
    audioElement.addEventListener('ended', () =>{
      playNext()
    })
    
    return () => {
      audioElement.removeEventListener('ended', () =>{
        console.log('꺼졌나?? ')
      })
    }
  }, [audioElement])

  return { nowMusic, queue, createNowPlaylist, playMusic, playNext }
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
