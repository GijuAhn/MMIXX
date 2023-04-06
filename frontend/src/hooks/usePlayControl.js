import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from "recoil"

import { _nowMusic, audioState, playlistQueue, _isPlaying, _onShuffle } from "atom/music"

export const usePlayControl = (playlistSeq) => {
  const audioElement = useRecoilValue(audioState)
  const [ nowMusic, setNow ] = useRecoilState(_nowMusic)
  const [ queue, setQueue ] = useRecoilState(playlistQueue)
  const [ isPlaying, setIsPlaying ] = useRecoilState(_isPlaying)
  const [ onShuffle, setOnShuffle ] = useRecoilState(_onShuffle)

  const createNowMusic = async (props) => {
    if (props?.musicUrl) {
      localStorage.setItem("_nowMusic", JSON.stringify({
        ...props,
        currentTime: 0,
        duration: audioElement.duration
      }))
      setIsPlaying(true)
    }
    // console.log(newMusic)
    return props.musicUrl
  }

  const createNowPlaylist = async ( playlist, start = 0 ) => {
    const newPlaylist = await playlist.map((item, index) => {
      if (index === start) {
        const newItem = {...item, playing: true}
        // localStorage.setItem('_nowMusic', JSON.stringify(newItem))
        // setAudioElement(new Audio(item.musicUrl))
        setNow(newItem)
        return newItem
      } else {
        return { ...item, playing: false } 
      }
    })
    const newObj = {
      playlistSeq,
      playlist: newPlaylist,
    }
    localStorage.setItem('_queue', JSON.stringify(newObj))
    setQueue(newObj)
    audioElement.src = newPlaylist[start].musicUrl
    audioElement.currentTime = 0
    audioElement.play()
    setIsPlaying(true)
    return newPlaylist[start]
  } 

  const playMusic = () => {
    audioElement.src = nowMusic.musicUrl
    audioElement.currentTime = nowMusic.currentTime
    audioElement.play()
  }

  const playPrev = async ( onShuffle = false ) => {
    const prevIndex = await queue.playlist.findIndex((item) => item.playing) - 1
    createNowMusic(queue.playlist[prevIndex])
    createNowPlaylist(queue.playlist, prevIndex)
  }

  /**
   * 다음 노래 재생하기 
   */
  const playNext = async ( onShuffle = false ) => {
    const nextIndex = await queue.playlist.findIndex((item) => item.playing) + 1
    createNowMusic(queue.playlist[nextIndex])
    createNowPlaylist(queue.playlist, nextIndex)
  }

  const handlePlay = () => {
    audioElement.play()
    setIsPlaying(true)
  }

  const handlePause = () => {
    audioElement.pause()
    setIsPlaying(false)
  }

  useEffect(() => {
    const handleNext = () => {
      setIsPlaying(false)
      const currentIndex = queue.playlist.findIndex((item) => item.playing)
      console.log(currentIndex)
      playNext(false, currentIndex + 1)
    }
    audioElement.addEventListener('ended', handleNext)
    audioElement.addEventListener('playing', () => {
      // console.log(audioElement.currentTime)
    })

  }, [audioElement])

  return { 
    audioElement, 
    isPlaying,
    setIsPlaying,
    nowMusic, 
    queue, 
    createNowPlaylist, 
    createNowMusic, 
    playMusic,
    playPrev,
    playNext,
    handlePlay,
    handlePause,
    onShuffle,
    setOnShuffle
  }
}