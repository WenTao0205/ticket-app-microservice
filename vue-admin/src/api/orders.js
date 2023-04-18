import axios from '../plugins/request'

export function getOrderList() {
  return axios({
    url: '/orders/indexAdmin',
    method: 'get'
  })
}

export function cancelOrder(orderId) {
  return axios({
    url: `/orders/deleteAdmin/${orderId}`,
    method: 'delete'
  })
}