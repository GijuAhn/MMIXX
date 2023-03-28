import axios from 'axios'

const base =  axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
  // headers: {
  //   'Authorization': `Bearer ${localStorage.getItem('token')}`
  // }
})

export const handleLogin = async () => {
  return await base({
    url: '/api/oauth2/authorization/google?access_type=offline&prompt=consent'
  })
}

export default base;