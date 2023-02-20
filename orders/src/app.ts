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
app.use(
  cookieSession({
    signed: false,
    secure: false
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