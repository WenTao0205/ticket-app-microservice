import axios from '../plugins/request'

export function getHallList(data) {
  return axios({
    url: '/hall/gethall',
    method: 'post',
    data
  })
}

export function createHall(data) {
  return axios({
    url: '/hall',
    method: 'post',
    data
  })
}

export function updateHall(hallId, data) {
  return axios({
    url: `/hall/${hallId}`,
    method: 'put',
    data
  })
}

export function deleteHall(ids) {
  return axios({
    url: `/hall`,
    method: 'delete',
    data: {
      ids
    }
  })
}