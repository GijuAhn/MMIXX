import axios from 'axios'

const instance =  axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
  // headers: {
  //   'Authorization': `Bearer ${localStorage.getItem('token')}`
  // }
})

export const handleLogin = async () => {
  return await instance({
    url: '/api/oauth2/authorization/google?access_type=offline&prompt=consent'
  })
}

export default instance;