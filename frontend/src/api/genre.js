import instance from './base'

export const getGenre = async () => {
  return await instance('/genre')
}

export const getGenreDetail = async (genreCategory) => {
  return await instance(`/genre/${genreCategory}`)
}

export const getPreset = async (genreSeq) => {
  return await instance(`/genre/preset/${genreSeq}`)
}