import axios from '../utils/request'

export function getShowList() {
  return axios({
    url: '/show',
    method: 'get'
  })
}

export function getShowDetail(showId) {
  return axios({
    url: `/show/${showId}`,
    method: 'get'
  })
}