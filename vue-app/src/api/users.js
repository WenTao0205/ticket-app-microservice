import axios from '../utils/request'

export async function getCurrentUser() {
  const res = await axios({
    url: '/users/currentuser',
    method: 'get'
  })
  return res.data.currentUser
}

export function alterUserInfo(data) {
  return axios({
    url: '/users/alteruserinfo',
    method: 'put',
    data
  })
}

export function signUp(data) {
  return axios({
    url: '/users/signup',
    method: 'post',
    data
  })
}

export function signIn(data) {
  return axios({
    url: '/users/signin',
    method: 'post',
    data
  })
}

export function signOut() {
  return axios({
    url: '/users/signout',
    method: 'post'
  })
}