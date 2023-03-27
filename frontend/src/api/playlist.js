import instance from './base'

export const getPlaylistDetail = async (seq) => {
  try {
    const res = await instance({
      params: seq,
      method: 'GET',
    })
    return res
  } catch (error) {
    return error
  }
}

export const testApi = async () => {
  try {
    const data = await instance({
      url: '/search',
      method: 'GET'
    })
    return data 
  } catch (error) {
    console.log(error)
  }
}  