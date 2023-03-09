import axios from '../plugins/request'

export function getShowList() {
  return axios({
    url: '/show',
    method: 'get'
  })
}

export function createShow(hallId, data) {
  return axios({
    url: `/show/${hallId}`,
    method: 'post',
    data
  })
}

export function updateShow(data) {
  return axios({
    url: '/show',
    method: 'put',
    data
  })
}

export function deleteShow(ids) {
  return axios({
    url: `/show`,
    method: 'delete',
    data: {
      ids
    }
  })
}