import express from 'express'
import { json } from 'body-parser'
import 'express-async-errors'
import cookieSession from 'cookie-session'

// router
import { indexShowRouter } from './route'
import { detailShowRouter } from './route/detail'
import { createShowRouter } from './route/new'
import { updateShowRouter } from './route/update'
import { deleteShowRouter } from './route/delete'

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
app.use(indexShowRouter)
app.use(detailShowRouter)
app.use(createShowRouter)
app.use(updateShowRouter)
app.use(deleteShowRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }