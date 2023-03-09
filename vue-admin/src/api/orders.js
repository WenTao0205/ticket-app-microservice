import axios from '../plugins/request'

export function getOrderList() {
  return axios({
    url: '/orders',
    method: 'get'
  })
}

export function cancelOrder(orderId) {
  return axios({
    url: `/orders/${orderId}`,
    method: 'delete'
  })
}