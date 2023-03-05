import express, { Request, Response } from 'express'
import { Show } from '../model/show'

const router = express.Router()

router.get('/api/show',
async (req: Request, res: Response) => {
  const shows = await Show.find({}).populate('hall')

  res.status(200).send(shows)
})

export { router as indexShowRouter }