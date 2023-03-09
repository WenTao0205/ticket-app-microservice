import express, { Request, Response } from 'express'
import { NotFoundError, requireAuth } from '@zwt-tickets/common'
import { Hall } from '../models/hall'
import { HallUpdatedPublisher } from '../events/publisher/hall-updated-publisher' 
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

router.put('/api/hall/:hallId',
requireAuth,
async (req: Request, res: Response) => {
  const hall = await Hall.findById(req.params.hallId)
  if(!hall) throw new NotFoundError()

  const { name, city, address, seatsNumber } = req.body
  hall.set({ name, city, address, seatsNumber })

  await hall.save()
  await new HallUpdatedPublisher(natsWrapper.client).publish({
    id: hall._id,
    name: hall.name,
    city: hall.city,
    address: hall.address,
    seatsNumber: hall.seatsNumber,
    version: hall.version
  })

  res.status(200).send(hall)
})

export { router as updateHallRouter }