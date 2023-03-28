import instance from './base'

export const getGenre = async () => {
  return await instance({
    url: '/genre',
  })
}

export const getGenreDetail = async (genreCategory) => {
  return await instance({
    url: `/genre/${genreCategory}`
  })
}

export const getPreset = async (genreSeq) => {
  return await instance({
    url: `/genre/preset/${genreSeq}`
  })
}