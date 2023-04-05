import instance from './base'

export const musicMix = async ( music_seq, preset_seq ) => {
  return await instance('/music/mix/', {
    headers: {
      "Content-Type": "multipart/json",
    }
  })
}