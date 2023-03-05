import express, { Request, Response } from 'express'
import { requireAuth, NotFoundError } from '@zwt-tickets/common'
import { Show } from '../model/show'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

router.delete('/api/show/:showId',
requireAuth,
async (req: Request, res: Response) => {
  const show = await Show.findById(req.params.showId).populate('hall')
  if(!show) throw new NotFoundError()
  
  await Show.findByIdAndDelete(req.params.showId)

  res.status(204).send({})
})

export { router as deleteShowRouter }