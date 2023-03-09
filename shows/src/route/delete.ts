import express, { Request, Response } from 'express'
import { requireAuth, NotFoundError } from '@zwt-tickets/common'
import { Show } from '../model/show'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

router.delete('/api/show',
requireAuth,
async (req: Request, res: Response) => {
  const { ids } = req.body
  
  for(let id of ids) {
    let hall = await Show.findById(id)
    if(!hall) throw new NotFoundError()
    hall = null
  }

  const data = await Show.deleteMany({
    _id: {
      $in: ids
    }
  })

  res.status(200).send(data)
})

export { router as deleteShowRouter }