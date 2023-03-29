import instance from './base'

export const musicMix = async ( user_seq, music_seq ) => {
  return await instance('/music/mix/', {
    headers: {
      "Content-Type": "multipart/json",
    }
  })
}