import express, { Request, Response } from 'express'
import {  NotFoundError, requireAuth } from '@zwt-tickets/common'
import { Hall } from '../models/hall'

const router = express.Router()

router.delete('/api/hall', requireAuth, async (req: Request, res: Response) => {
  const { ids } = req.body
  
  for(let id of ids) {
    let hall = await Hall.findById(id)
    if(!hall) throw new NotFoundError()
    hall = null
  }

  const data = await Hall.deleteMany({
    _id: {
      $in: ids
    }
  })

  res.status(200).send(data)
})

export { router as deleteHallRouter }