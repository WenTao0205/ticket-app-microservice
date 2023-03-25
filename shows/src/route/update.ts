import express, { Request, Response } from 'express'
import { requireAuth, NotFoundError } from '@zwt-tickets/common'
import { Show } from '../model/show'
import { ShowUpdatedPublisher } from '../events/publisher/show-updated-publisher'
import { natsWrapper } from '../nats-wrapper'
import { Hall } from '../model/hall'

const router = express.Router()

router.put('/api/show',
requireAuth,
async (req: Request, res: Response) => {
  const show = await Show.findById(req.body.id).populate('hall')
  if(!show) throw new NotFoundError()

  const hall = await Hall.findById(req.body.hallId)
  if(!hall) throw new NotFoundError()

  const { title, intro, type, rank, price, cover, startTime, endTime } = req.body
  show.set({ title, intro, type, rank, price, cover, startTime, endTime, hall })

  await show.save()
  await new ShowUpdatedPublisher(natsWrapper.client).publish({
    id: show._id,
    title: show.title,
    type: show.type,
    rank: show.rank,
    intro: show.intro,
    price: show.price,
    cover: show.cover,
    startTime: show.startTime,
    endTime: show.endTime,
    hall: show.hall,
    version: show.version
  })

  res.status(200).send(show)
})

export { router as updateShowRouter }