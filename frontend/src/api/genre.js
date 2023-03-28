import instance from './base'

export const getGenre = async () => {
  return await instance()
}

export const getGenreDetail = async (genreCategory) => {
  return await instance({
    params: {
      genreCategory
    }
  })
}

export const getPreset = async (genreSeq) => {
  return await instance({
    url: '/preset',
    params: {
      genreSeq
    }
  })
}