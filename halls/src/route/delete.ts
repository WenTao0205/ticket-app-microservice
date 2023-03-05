import express, { Request, Response } from 'express'
import {  NotFoundError, requireAuth } from '@zwt-tickets/common'
import { Hall } from '../models/hall'

const router = express.Router()

router.delete('/api/hall/:hallId', requireAuth, async (req: Request, res: Response) => {
  const hall = await Hall.findById(req.params.hallId)
  if(!hall) throw new NotFoundError()

  await Hall.findByIdAndDelete(req.params.hallId)

  res.status(204).send({})
})

export { router as deleteHallRouter }