import axios from 'axios'

const instance =  axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // baseURL: 'http://localhost:5555/api', // 로컬 테스트
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('auth')}`
  }
})

// instance.defaults.headers.common['Authorization'] = 'token';

export const handleLogin = async () => {
  return await instance({
    url: 'http://localhost:5555/api/user/login'
  })
}

export default instance;