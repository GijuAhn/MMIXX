import base from './base'
import axios from 'axios'

export const getPlaylist = async() => {
  const data = await base.get()

  return base;
}

export const getPlaylistDetail = async( params ) => {
  const data = await axios(params)

  return data
}