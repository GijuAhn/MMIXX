import axios from 'axios'

const instance =  axios.create({
  baseURL: process.env.REACT_APP_TEST,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})

export default instance;