import axios from 'axios'

export const client =  axios.create({
  baseURL: process.env.REACT_API_TEST
})