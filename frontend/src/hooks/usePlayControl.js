import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from "recoil"

import { _nowMusic, audioState, playlistQueue, _isPlaying } from "atom/music"

export const usePlayControl = (playlistSeq) => {
  const audioElement = useRecoilValue(audioState)
  const [ nowMusic, setNow ] = useRecoilState(_nowMusic)
  const [ queue, setQueue ] = useRecoilState(playlistQueue)
  const [ isPlaying, setIsPlaying ] = useRecoilState(_isPlaying)

  const createNowMusic = async (props) => {
    const newMusic = await props.find((item) => item.playing)
    if (newMusic?.musicUrl) {
      audioElement.src = newMusic.musicUrl
      audioElement.play()
      localStorage.setItem("_nowMusic", JSON.stringify({
        ...newMusic,
        currentTime: 0,
      }))
      setIsPlaying(true)
    }
    console.log(newMusic)
    return newMusic.musicUrl
  }

  const createNowPlaylist = async ( playlist, start = 0 ) => {
    const newPlaylist = await playlist.map((item, index) => {
      if (index === start) {
        const newItem = {...item, playing: true}
        // localStorage.setItem('_nowMusic', JSON.stringify(newItem))
        // setAudioElement(new Audio(item.musicUrl))
        setNow(newItem)
        return { ...item, playing: true }
      } else {
        return { ...item, playing: false } 
      }
    })
    const newObj = {
      playlistSeq,
      playlist: newPlaylist,
    }
    console.log(newObj)
    localStorage.setItem('_queue', JSON.stringify(newObj))
    setQueue(newObj)
    return newPlaylist
  } 

  const playMusic = () => {
    audioElement.src = nowMusic.musicUrl
    audioElement.currentTime = nowMusic.currentTime
    audioElement.play()
  }

  /**
   * 다음 노래 재생하기 
   */
  const playNext = async ( onShuffle = false ) => {
    const playlist = queue.playlist
    const currentIndex = playlist.findIndex((item) => item.playing)
    const queueLength = playlist.length
    let nextIndex = -1
    if (onShuffle) {
      nextIndex = Math.floor(Math.random() * queueLength)

    } else if (currentIndex < queueLength) {
      nextIndex = currentIndex + 1
    } else {
      audioElement.src = ''
    }

    const newQueue = await playlist.map((item, index) => {
      if (index === nextIndex) {
        return {...item, playing: true}
      } else {
        return {...item, playing: false}
      }
    })
    const res = await createNowPlaylist(newQueue)
    createNowMusic(res)
    // createNowMusic(newQueue)
  }

  useEffect(() => {
    audioElement.addEventListener('ended', () => {
      setIsPlaying(false)
      playNext()
    })
    audioElement.addEventListener('playing', () => {
      console.log(audioElement.currentTime)
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
    playNext 
  }
}