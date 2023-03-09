import axios from '../plugins/request'

export function signIn(data) {
  return axios({
    url: '/admin/signin',
    method: 'post',
    data
  })
}