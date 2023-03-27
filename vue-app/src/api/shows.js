import axios from '../utils/request'

export function getShowList(data) {
  return axios({
    url: '/show',
    method: 'post',
    data
  })
}

export function getShowDetail(showId) {
  return axios({
    url: `/show/${showId}`,
    method: 'get'
  })
}