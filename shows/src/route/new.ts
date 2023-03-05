import express, { Request, Response } from 'express'
import { NotFoundError, requireAuth } from '@zwt-tickets/common'
import { Show } from '../model/show'
import { Hall } from '../model/hall'
import { ShowCreatedPublisher } from '../events/publisher/show-created-publisher'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

router.post('/api/show/:hallId',
requireAuth,
async (req: Request, res: Response) => {
  const hall = await Hall.findById(req.params.hallId)
  if(!hall) throw new NotFoundError()

  const { title, intro, price, cover, startTime, endTime } = req.body
  const show = Show.build({ title, intro, price, cover, startTime, endTime, hall })
  
  await show.save()
  await new ShowCreatedPublisher(natsWrapper.client).publish({
    id: show.id,
    title: show.title,
    intro: show.intro,
    price: show.price,
    cover: show.cover,
    startTime: show.startTime,
    endTime: show.endTime,
    hall: show.hall
  })

  res.status(201).send(show)
})

export { router as createShowRouter }