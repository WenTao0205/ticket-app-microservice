import express from 'express'
import { json } from 'body-parser'
import 'express-async-errors'
import cookieSession from 'cookie-session'

// router
import { createTicketRouter } from './route/new'
import { showTicketRouter } from './route/show'
import { indexTicketRouter } from './route'
import { updateTicketRouter } from './route/update'

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
app.use(createTicketRouter)
app.use(showTicketRouter)
app.use(indexTicketRouter)
app.use(updateTicketRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }