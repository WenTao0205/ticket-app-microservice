import express from 'express'
import { json } from 'body-parser'
import 'express-async-errors'
import cookieSession from 'cookie-session'

// router
import { signinRouter } from './route/signin'

// error
import { errorHandler, NotFoundError } from '@zwt-tickets/common'


const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: false,
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000
  })
)

app.use(signinRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }