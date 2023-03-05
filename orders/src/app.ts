import express from 'express'
import { json } from 'body-parser'
import 'express-async-errors'
import cookieSession from 'cookie-session'

// router
import { newOrderRouter } from './route/new'
import { detailOrderRouter } from './route/detail'
import { indexOrderRouter } from './route'
import { deleteOrderRouter } from './route/delete'
import { completeOrderRouter } from './route/complete'

// error
import { errorHandler, NotFoundError, currentUser } from '@zwt-tickets/common'

const app = express()
app.set('trust proxy', true)
app.use(json())
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
app.use(detailOrderRouter)
app.use(newOrderRouter)
app.use(deleteOrderRouter)
app.use(completeOrderRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }