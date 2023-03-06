import axios from '../utils/request'

export function getOrderList() {
  return axios({
    url: '/orders',
    method: 'get'
  })
}

export function getOrderDetail(orderId) {
  return axios({
    url: `/orders/${orderId}`,
    method: 'get'
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
    url: `/orders/${orderId}`,
    method: 'delete'
  })
}

export function completeOrder(orderId) {
  return axios({
    url: `/orders/${orderId}`,
    method: 'put'
  })
}