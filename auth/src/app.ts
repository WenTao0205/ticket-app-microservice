import express from 'express'
import { json } from 'body-parser'
import 'express-async-errors'
import cookieSession from 'cookie-session'

// router
import { currentUserRouter } from './route/current-user'
import { signinRouter } from './route/signin'
import { signoutRouter } from './route/signout'
import { signupRouter } from './route/signup'

// error
import { errorHandler, NotFoundError } from '@zwt-tickets/common'

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: false
  })
)

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }