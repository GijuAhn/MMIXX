import instance from './base'

export const musicMix = async ( user_seq, preset_seq ) => {
  return await instance('/music/mix/', {
    headers: {
      "Content-Type": "multipart/json",
    }
  })
}