import express from 'express'
import { json } from 'body-parser'
import 'express-async-errors'
import cookieSession from 'cookie-session'

// router
import { indexHallRouter } from './route'
import { createHallRouter } from './route/create'
import { deleteHallRouter } from './route/delete'
import { updateHallRouter } from './route/update'

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
app.use(indexHallRouter)
app.use(createHallRouter)
app.use(deleteHallRouter)
app.use(updateHallRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }