import axios from 'axios'

export default axios.create({
  baseURL: process.env.dev.REACT_API_URL
})