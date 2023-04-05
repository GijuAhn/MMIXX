import axios from 'axios'

const instance =  axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // baseURL: 'https://j8a403.p.ssafy.io/api',
  // baseURL: 'http://localhost:5555/api', // 로컬 테스트
  // headers: {
  //   'Authorization': `Bearer ${localStorage.getItem('auth')}`
  // }
})

instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('auth')}`

const logout = axios.create({
  baseURL : 'https://j8a403.p.ssafy.io/api'
})
export const handleLogout = async () => {
  return await logout({
    url: `/logout`
  })
}

export default instance;