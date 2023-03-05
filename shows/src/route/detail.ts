import express, { Request, Response } from 'express'
import { NotFoundError } from '@zwt-tickets/common'
import { Show } from '../model/show'

const router = express.Router()

router.get('/api/show/:showId',
async (req: Request, res: Response) => {
  const show = await Show.findById(req.params.showId).populate('hall')
  if(!show) throw new NotFoundError()

  res.status(200).send(show)
})

export { router as detailShowRouter }