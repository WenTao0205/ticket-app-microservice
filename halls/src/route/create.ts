import express, { Request, Response } from 'express'
import { requireAuth } from '@zwt-tickets/common'
import { Hall } from '../models/hall'
import { HallCreatedPublisher } from '../events/publisher/hall-create-publisher'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

router.post('/api/hall',
requireAuth,
async (req: Request, res: Response) => {
  const { name, city, address, seatsNumber } = req.body
  const hall = Hall.build({
    name, city, address, seatsNumber
  })
  await hall.save()
  await new HallCreatedPublisher(natsWrapper.client).publish({
    id: hall.id,
    name: hall.name,
    city: hall.city,
    address: hall.address,
    seatsNumber: hall.seatsNumber
  })

  res.status(201).send(hall)
})

export { router as createHallRouter }