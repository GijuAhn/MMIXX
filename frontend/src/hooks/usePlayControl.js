import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from "recoil"

import { _now, audioState, playlistQueue } from "atom/music"

export const usePlayControl = () => {
  /**
   * 현재 진행중인 곡이 속해있는 리스트 가져오기
   */
  const [ audioElement, setAudioElement ] = useRecoilState(audioState)
  const [ nowMusic, setNow ] = useRecoilState(_now)
  const [ queue, setQueue ] = useRecoilState(playlistQueue)


  /**
   * 현재 실행될 음악이 담긴 플레이리스트 값 설정
   */ 
  const createNowPlaylist = async ( playlist, start = 0 ) => {
    const newPlaylist = await playlist.map((item, index) => {
      if (index === start) {
        const newItem = {...item, playing: true}
        localStorage.setItem('_nowMusic', JSON.stringify(newItem))
        setAudioElement(new Audio(item.musicUrl))
        setNow(newItem)
        return { ...item, playing: true }
      } else {
        return { ...item, playing: false } 
      }
    })
    localStorage.setItem('_queue', JSON.stringify(newPlaylist))
    setQueue(newPlaylist)
  } 

  /**
   * NowMusic에 값이 생기면 노래 재생하기 
   */
  const playMusic = () => {
    if (audioElement.src) {
      console.log('playMusic', audioElement)
      audioElement.play()
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

    setNow(queue.find((item) => item.playing))
  }

  // useEffect(() => {
  //   // if (audioElement.src & audioElement.paused) {
  //   //   audioElement.play()
  //   // } else {
  //   //   audioElement.pause()
  //   // }

  //   const handlePlay = () => {
  //     console.log('재생 시작');
  //   };
  
  //   const handlePause = () => {
  //     console.log('일시 중지');
  //   };
  
  //   const handleEnded = () => {
  //     console.log('재생 완료');
  //   };
  
  //   const handleError = () => {
  //     console.log('오류 발생');
  //   };
  
  //   audioElement.addEventListener('play', handlePlay);
  //   audioElement.addEventListener('pause', handlePause);
  //   audioElement.addEventListener('ended', handleEnded);
  //   audioElement.addEventListener('error', handleError);
  
  //   return () => {
  //     audioElement.removeEventListener('play', handlePlay);
  //     audioElement.removeEventListener('pause', handlePause);
  //     audioElement.removeEventListener('ended', handleEnded);
  //     audioElement.removeEventListener('error', handleError);
  //   };
  // }, [audioElement])

  // useEffect(() => {
  //   audioElement.addEventListener('ended', () =>{
  //     playNext()
  //   })
    
  //   return () => {
  //     audioElement.removeEventListener('ended', () =>{
  //       console.log('꺼졌나?? ')
  //     })
  //   }
  // }, [audioElement])

  return { audioElement, nowMusic, queue, createNowPlaylist, playMusic, playNext }
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
