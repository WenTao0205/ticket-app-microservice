import axios from "axios"
import { Message } from 'element-ui'

const _axios = axios.create({
  withCredentials: true
})

_axios.interceptors.response.use(
  response => {
    return response
  },
  err => {
    const errors = err.response.data.errors || err.response.statusText
    if(errors instanceof Array) {
      for(let error of errors) {
        window.setTimeout(() => {
          Message.error({
            message: error.message,
            type: 'error'
          })
        }, 0)
      }
    } else {
      Notification.error({
        message: errors,
        type: 'error'
      })
    }
    return Promise.reject(err)
  }
)

export default _axios