import axios from 'axios';

export default () => {
  return axios.create({
    baseURL: 'https://ticketing.dev',
    withCredentials: true
  })
}
