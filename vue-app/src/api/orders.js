import axios from '../utils/request'

export function getOrderList() {
  return axios({
    url: '/orders',
    method: 'get'
  })
}

export function getOrderDetail(id) {
  return axios({
    url: '/orders',
    method: 'get',
    params: {
      id
    }
  })
}

export function createOrder(data) {
  return axios({
    url: '/orders',
    method: 'post',
    data
  })
}

export function cancelOrder(orderId) {
  return axios({
    url: '/orders',
    method: 'delete',
    params: {
      orderId
    }
  })
}

export function completeOrder(orderId) {
  return axios({
    url: '/orders',
    method: 'put',
    params: {
      orderId
    }
  })
}