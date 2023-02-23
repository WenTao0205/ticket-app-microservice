import express from 'express'
import { json } from 'body-parser'
import 'express-async-errors'
import cookieSession from 'cookie-session'

// router
import { newOrderRouter } from './route/new'
import { showOrderRouter } from './route/show'
import { indexOrderRouter } from './route'
import { deleteOrderRouter } from './route/delete'

// error
import { errorHandler, NotFoundError, currentUser } from '@zwt-tickets/common'

const app = express()
app.set('trust proxy', true)
app.use(json())
// postman
// app.use(
//   cookieSession({
//     signed: false,
//     secure: false,
//     httpOnly: false
//   })
// )
// 浏览器
app.use(
  cookieSession({
    signed: false,
    secure: true,
    sameSite: 'none',
    httpOnly: false
  })
)

app.use(currentUser)
app.use(indexOrderRouter)
app.use(showOrderRouter)
app.use(newOrderRouter)
app.use(deleteOrderRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }