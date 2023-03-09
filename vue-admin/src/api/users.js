import axios from '../plugins/request'

export function getAllUser(data) {
  return axios({
    url: '/users',
    method: 'post',
    data
  })
}

export function alterUserInfo(data) {
  return axios({
    url: '/users/alteruserinfo',
    method: 'put',
    data
  })
}

export function deleteUser(data) {
  return axios({
    url: '/users/deleteuser',
    method: 'delete',
    data
  })
}